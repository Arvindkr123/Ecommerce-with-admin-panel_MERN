import dotenv from "dotenv";
dotenv.config();

export const { PORT, MONOG_URI, JWT_SECRET } = process.env;
