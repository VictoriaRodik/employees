import { Router } from "express";
import employeeController from "../controllers/employeeController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getEmployees, createEmployee, updateEmployee, deleteEmployee } =
  employeeController;

const router = Router();

router.get("/", authenticateToken, getEmployees);
router.post("/", authenticateToken, createEmployee);
router.put("/:id", authenticateToken, updateEmployee);
router.delete("/:id", authenticateToken, deleteEmployee);

export default router;
