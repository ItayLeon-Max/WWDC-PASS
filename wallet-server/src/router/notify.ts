import { Request, Response, Router } from "express";
import { sendPushNotification } from "../service/sendPush";

const notifyRouter = Router();

notifyRouter.post("/push/:token", async (req: Request<{ token: string }>, res: Response) => {
  const { token } = req.params;

  try {
    await sendPushNotification(token);
    res.send("✅ Push sent!");
  } catch (err) {
    console.error("❌ Push error:", err);
    res.status(500).send("Failed to send push");
  }
});

export default notifyRouter;