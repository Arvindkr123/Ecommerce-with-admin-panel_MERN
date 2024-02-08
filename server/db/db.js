import mongoose from "mongoose";
import { MONOG_URI } from "../config/config.js";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(MONOG_URI);
    console.log("Database connection established", res.connection.host);
  } catch (error) {
    console.log("Error : " + error.message);
  }
};
export default connectDB;
