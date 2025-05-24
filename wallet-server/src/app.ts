import express from "express";
import bodyParser from "body-parser";
import path from "path";
import passRouter from "./router/pass";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing application/json
app.use(bodyParser.json());

// Router for handling /pass routes
app.use("/pass", passRouter);

// Middleware for serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});