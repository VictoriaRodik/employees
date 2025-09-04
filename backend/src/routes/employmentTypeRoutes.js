import { Router } from "express";
import employmentTypeController from "../controllers/employmentTypeController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getEmploymentTypes, createEmploymentType, updateEmploymentType, deleteEmploymentType } =
  employmentTypeController;

const router = Router();

router.get("/", authenticateToken, getEmploymentTypes);
router.post("/", authenticateToken, createEmploymentType);
router.put("/:id", authenticateToken, updateEmploymentType);
router.delete("/:id", authenticateToken, deleteEmploymentType);

export default router;
