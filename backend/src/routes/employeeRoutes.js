import { Router } from "express";
import employeeController from "../controllers/employeeController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getEmployees, createEmployee, editEmployee, removeEmployee } =
  employeeController;

const router = Router();

router.get("/", authenticateToken, getEmployees);
router.post("/", authenticateToken, createEmployee);
router.put("/:id", authenticateToken, editEmployee);
router.delete("/:id", authenticateToken, removeEmployee);

export default router;
