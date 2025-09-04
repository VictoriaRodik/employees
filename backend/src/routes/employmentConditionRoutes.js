import { Router } from "express";
import employmentConditionController from "../controllers/employmentConditionController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getEmploymentConditions, createEmploymentCondition, updateEmploymentCondition, deleteEmploymentCondition } =
  employmentConditionController;

const router = Router();

router.get("/", authenticateToken, getEmploymentConditions);
router.post("/", authenticateToken, createEmploymentCondition);
router.put("/:id", authenticateToken, updateEmploymentCondition);
router.delete("/:id", authenticateToken, deleteEmploymentCondition);

export default router;
