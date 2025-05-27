import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const versionRouter = Router();

versionRouter.get("/pass/version", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../public/pass/version.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read version file:", err);
      return res.status(500).json({ error: "Failed to read version" });
    }

    try {
      const versionData = JSON.parse(data);
      res.json(versionData);
    } catch (parseErr) {
      console.error("Invalid JSON:", parseErr);
      res.status(500).json({ error: "Invalid version format" });
    }
  });
});

export default versionRouter;