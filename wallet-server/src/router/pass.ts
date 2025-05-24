import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { generatePass } from "../service/passGenerator";

const router = require("express").Router();

router.post("/generate", async (req: Request, res: Response) => {
  console.log("BODY RECEIVED:", req.body); 

  const name = req.body.name as string;

  if (!name) {
    return res.status(400).json({ error: "Missing 'name' query parameter." });
  }

  try {
    const passPath = await generatePass(name);
    const fileName = path.basename(passPath);

    res.download(passPath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Failed to send pass file.");
      } else {
        fs.unlink(passPath, () => {});
      }
    });
  } catch (error) {
    console.error("Error generating pass:", error);
    res.status(500).json({ error: "Failed to generate pass." });
  }
});

export default router;