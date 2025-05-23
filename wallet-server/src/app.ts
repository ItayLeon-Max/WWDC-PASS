import express from "express";
import dotenv from "dotenv";
import path from "path";
import passRouter from "./router/pass";
import { config } from "./config/config";

dotenv.config();

const app = express();
const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, "../public")));

app.use("/pass", passRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});