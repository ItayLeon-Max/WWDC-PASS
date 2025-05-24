import express from "express";
import bodyParser from "body-parser";
import passRouter from "./router/pass";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use(passRouter);
app.use("/pass", passRouter); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});