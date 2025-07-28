import { Router } from "express";
import gradeSalaryController from "../controllers/gradeSalaryController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getGradeSalaries, createGradeSalary, updateGradeSalary, deleteGradeSalary } =
  gradeSalaryController;

const router = Router();

router.get("/", authenticateToken, getGradeSalaries);
router.post("/", authenticateToken, createGradeSalary);
router.put("/:id", authenticateToken, updateGradeSalary);
router.delete("/:id", authenticateToken, deleteGradeSalary);

export default router;
