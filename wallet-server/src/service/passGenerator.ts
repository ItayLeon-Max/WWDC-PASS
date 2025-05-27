import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { spawn } from 'child_process';
import archiver from 'archiver';

const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'pass.json');
const ICON_PATH = path.join(__dirname, '..', 'assets', 'icon.png');
const LOGO_PATH = path.join(__dirname, '..', 'assets', 'logo.png');
const CERTS_PATH = path.join(__dirname, '..', '..', 'certs');
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'assets');
const VERSION_PATH = path.join(__dirname, '..', '..', 'public', 'pass', 'version.json');

export async function generatePass(attendeeName: string): Promise<string> {
  console.log("🟡 Starting pass generation for:", attendeeName);

  const timestamp = Date.now();
  const passFolder = path.join(OUTPUT_DIR, `pass-${timestamp}`);
  const passFile = path.join(OUTPUT_DIR, `WWDC25-${timestamp}.pkpass`);

  try {
    await fs.mkdir(passFolder, { recursive: true });
    console.log("📁 Created pass folder:", passFolder);

    // Load and update pass.json
    const raw = await fs.readFile(TEMPLATE_PATH, 'utf8');
    const passJson = JSON.parse(raw);
    passJson.eventTicket.primaryFields[0].value = attendeeName;

    // Add authenticationToken and webServiceURL for push updates
    passJson.authenticationToken = crypto.randomBytes(16).toString("hex");
    passJson.webServiceURL = "https://wwdc-pass.onrender.com/api/passes";

    // Load version from version.json
    const versionRaw = await fs.readFile(VERSION_PATH, 'utf8');
    const versionData = JSON.parse(versionRaw);
    const version = versionData.version || "1.0.0";

    // Update or add version field in backFields
    passJson.eventTicket.backFields = [
      ...(passJson.eventTicket.backFields || []).filter((f: { key: string }) => f.key !== "version"),
      {
        key: "version",
        label: "Version",
        value: version
      }
    ];

    const updatedPassPath = path.join(passFolder, 'pass.json');
    await fs.writeFile(updatedPassPath, JSON.stringify(passJson, null, 2));
    console.log("✅ pass.json created at:", updatedPassPath);

    // Copy images
    await fs.copyFile(ICON_PATH, path.join(passFolder, 'icon.png'));
    await fs.copyFile(LOGO_PATH, path.join(passFolder, 'logo.png'));
    console.log("🖼️ Copied icon and logo");

    // Generate manifest.json
    const manifest: Record<string, string> = {};
    const files = ['pass.json', 'icon.png', 'logo.png'];
    for (const file of files) {
      const content = await fs.readFile(path.join(passFolder, file));
      const hash = crypto.createHash('sha1').update(content).digest('hex');
      manifest[file] = hash;
    }

    const manifestPath = path.join(passFolder, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("📝 Created manifest.json");

    // Sign using OpenSSL
    const signaturePath = path.join(passFolder, 'signature');
    await new Promise((resolve, reject) => {
      const openssl = spawn('openssl', [
        'smime', '-binary', '-sign',
        '-certfile', path.join(CERTS_PATH, 'WWDR.pem'),
        '-signer', path.join(CERTS_PATH, 'passcertificate.pem'),
        '-inkey', path.join(CERTS_PATH, 'passkey.pem'),
        '-in', manifestPath,
        '-out', signaturePath,
        '-outform', 'DER'
      ]);

      openssl.on('exit', (code) => {
        if (code === 0) {
          console.log("🔏 Signature created successfully");
          resolve(null);
        } else {
          console.error("❌ OpenSSL signing failed with code", code);
          reject(new Error('OpenSSL signing failed'));
        }
      });
    });

    // Create .pkpass ZIP
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = await fs.open(passFile, 'w');
    const stream = output.createWriteStream();

    archive.pipe(stream);
    archive.file(updatedPassPath, { name: 'pass.json' });
    archive.file(path.join(passFolder, 'icon.png'), { name: 'icon.png' });
    archive.file(path.join(passFolder, 'logo.png'), { name: 'logo.png' });
    archive.file(manifestPath, { name: 'manifest.json' });
    archive.file(signaturePath, { name: 'signature' });

    await archive.finalize();

    console.log("✅ .pkpass created successfully:", passFile);
    return passFile;

  } catch (err) {
    console.error("❌ Error generating pass:", err);
    throw err;
  }
}