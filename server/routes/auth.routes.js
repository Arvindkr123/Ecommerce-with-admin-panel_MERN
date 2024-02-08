import express from "express";
import { registerController, loginContoller } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginContoller);

export default router;
