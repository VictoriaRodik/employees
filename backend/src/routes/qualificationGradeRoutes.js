import { Router } from "express";
import qualificationGradeController from "../controllers/qualificationGradeController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getQualificationGrades, createQualificationGrade, updateQualificationGrade, deleteQualificationGrade } =
  qualificationGradeController;

const router = Router();

router.get("/", authenticateToken, getQualificationGrades);
router.post("/", authenticateToken, createQualificationGrade);
router.put("/:id", authenticateToken, updateQualificationGrade);
router.delete("/:id", authenticateToken, deleteQualificationGrade);

export default router;
