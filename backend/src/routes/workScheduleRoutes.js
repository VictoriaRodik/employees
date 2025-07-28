import { Router } from "express";
import workScheduleController from "../controllers/workScheduleController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getWorkSchedules, createWorkSchedule, updateWorkSchedule, deleteWorkSchedule } =
  workScheduleController;

const router = Router();

router.get("/", authenticateToken, getWorkSchedules);
router.post("/", authenticateToken, createWorkSchedule);
router.put("/:id", authenticateToken, updateWorkSchedule);
router.delete("/:id", authenticateToken, deleteWorkSchedule);

export default router;
