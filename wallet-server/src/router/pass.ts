import { Request, Response } from "express";
import path from "path";
import fs, { createReadStream } from "fs";
import { generatePass } from "../service/passGenerator";

const router = require("express").Router();

router.post("/generate", async (req: Request, res: Response) => {
  console.log("✅ Got request to /pass/generate");

  const name = req.body.name as string;

  if (!name) {
    return res.status(400).json({ error: "Missing 'name' parameter." });
  }

  try {
    const passPath = await generatePass(name);
    const fileName = path.basename(passPath);

    res.setHeader("Content-Type", "application/vnd.apple.pkpass");
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    const stream = createReadStream(passPath);
    stream.pipe(res);

    stream.on("end", () => {
      fs.unlink(passPath, () => {});
    });
  } catch (error) {
    console.error("❌ Failed to generate pass:", error);
    res.status(500).json({ error: "Failed to generate pass." });
  }
});

export default router;