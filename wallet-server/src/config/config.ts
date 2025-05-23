// src/config.ts
export const config = {
  port: process.env.PORT || 3000,
  teamIdentifier: "A7992DZ29G",
  passTypeIdentifier: "pass.wwdc25",
  organizationName: "Itay Leon",
  wwdrCert: "certs/AppleWWDRCAG4.cer",
  passCert: "certs/passcertificate.pem",
  passKey: "certs/passkey.pem",
  outputDir: "passes",
};