import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { products } from "./products.js";
import { PORT } from "./config/config.js";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import stripRoutes from "./routes/strip.routes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/strip/create-checkout-session", stripRoutes);

app.get("/", (req, res) => {
  res.end("Welcome to our Shop Online API......");
});

app.get("/products", (req, res) => {
  res.send(products);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server listening on port 8080");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
