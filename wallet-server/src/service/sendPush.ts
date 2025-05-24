import apn from "apn";
import path from "path";

export async function sendPushNotification(pushToken: string) {
  const certPath = path.join(__dirname, "..", "..", "certs", "push_certificate.pem");
  const keyPath = path.join(__dirname, "..", "..", "certs", "push_key.pem");

  const provider = new apn.Provider({
    cert: certPath,
    key: keyPath,
    production: true,
  });

  const notification = new apn.Notification({
    topic: "pass.wwdc25",
    pushType: "background",
    payload: {}, // ריק עבור Wallet
  });

  try {
    const result = await provider.send(notification, pushToken);
    console.log("📬 Push sent:", result.sent.length > 0 ? "Success" : "Failed", result);
  } catch (error) {
    console.error("❌ Error sending push:", error);
  } finally {
    provider.shutdown();
  }
}