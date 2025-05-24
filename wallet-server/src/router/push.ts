import express, { Router, Request, Response } from "express";

const pushRouter = require("express").Router();
pushRouter.use(express.json()); // הוספת JSON parser ספציפית לנתיב הזה

interface Registration {
  serialNumber: string;
  deviceLibraryIdentifier: string;
  pushToken: string;
}

const registrations: Record<string, Registration> = {};

pushRouter.post(
  "/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber",
  (req: Request, res: Response) => {
    const { deviceLibraryIdentifier, passTypeIdentifier, serialNumber } = req.params;
    
    console.log("📲 Full body received:", JSON.stringify(req.body, null, 2));

    const pushToken = req.body.pushToken || req.body["pushToken"];
    console.log("📲 Received push token:", pushToken);

    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("ApplePass ")) {
      return res.status(401).send("Missing or invalid Authorization header");
    }

    const clientToken = authHeader.replace("ApplePass ", "");
    const expectedToken = "e761bf4052cd04fe2452de256cdc1c07";

    if (clientToken !== expectedToken) {
      return res.status(403).send("Invalid authentication token");
    }

    if (!pushToken) {
      console.warn("⚠️ Missing pushToken in request body!");
      return res.status(400).send("Missing pushToken");
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