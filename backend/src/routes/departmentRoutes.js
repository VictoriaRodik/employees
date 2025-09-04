import { Router } from "express";
import departmentController from "../controllers/departmentController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getDepartments, createDepartment, updateDepartment, deleteDepartment } =
  departmentController;

const router = Router();

router.get("/", authenticateToken, getDepartments);
router.post("/", authenticateToken, createDepartment);
router.put("/:id", authenticateToken, updateDepartment);
router.delete("/:id", authenticateToken, deleteDepartment);

export default router;
