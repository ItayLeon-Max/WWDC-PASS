import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import passRouter from "./router/pass";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/pass", passRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});