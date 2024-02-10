import express from "express";
import { makePaymentController } from "../controllers/payment.controllers.js";

const router = express.Router();

router.post("/", makePaymentController);

export default router;
