// src/router/push.ts
import { Router, Request, Response } from "express";

const pushRouter = require("express").Router();

interface Registration {
  serialNumber: string;
  deviceLibraryIdentifier: string;
  pushToken: string;
}

const registrations: Record<string, Registration> = {};

pushRouter.post(
  "/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber",
  (req: Request, res: Response) => {
    const { deviceLibraryIdentifier, passTypeIdentifier, serialNumber } = req.params;
    const { pushToken } = req.body;

    console.log("📲 Received push token:", req.body.pushToken)
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("ApplePass ")) {
      return res.status(401).send("Missing or invalid Authorization header");
    }

    const clientToken = authHeader.replace("ApplePass ", "");
    const expectedToken = "e761bf4052cd04fe2452de256cdc1c07";

    if (clientToken !== expectedToken) {
      return res.status(403).send("Invalid authentication token");
    }

    registrations[serialNumber] = {
      serialNumber,
      deviceLibraryIdentifier,
      pushToken,
    };

    console.log(`✅ Registered device ${deviceLibraryIdentifier} for pass ${serialNumber}`);
    return res.sendStatus(201); // Created
  }
);

export default pushRouter;
