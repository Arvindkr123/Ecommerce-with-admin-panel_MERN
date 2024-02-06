import express from "express";
import cors from "cors";
import { products } from "./products.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.end("Welcome to our Shop Online API......");
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
