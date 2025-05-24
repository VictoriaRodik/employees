import { Router } from "express";
import authController from "../controllers/authController.js";

const { login } = authController;

const router = Router();

router.post("/login", login);

export default router;
