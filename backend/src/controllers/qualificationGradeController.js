import * as qualificationGradeService from "../services/qualificationGradeService.js";

const getQualificationGrades = async (req, res) => {
  const qualificationGrades = await qualificationGradeService.getAllQualificationGrades();
  res.json(qualificationGrades);
};

const getQualificationGrade = async (req, res) => {
  const qualificationGrades = await qualificationGradeService.getQualificationGradeById(req.params.id);
  if (qualificationGrades) {
    res.json(qualificationGrades);
  } else {
    res.status(404).json({ message: "QualificationGrade not found" });
  }
};

const createQualificationGrade = async (req, res) => {
  const newQualificationGrade = await qualificationGradeService.createQualificationGrade(req.body);
  res.status(201).json(newQualificationGrade);
};

const updateQualificationGrade = async (req, res) => {
  const success = await qualificationGradeService.updateQualificationGrade(req.params.id, req.body);
  if (success) {
    res.json({ message: "QualificationGrade updated" });
  } else {
    res.status(404).json({ message: "QualificationGrade not found" });
  }
};

const deleteQualificationGrade = async (req, res) => {
  const success = await qualificationGradeService.deleteQualificationGrade(req.params.id);
  if (success) {
    res.json({ message: "QualificationGrade deleted" });
  } else {
    res.status(404).json({ message: "QualificationGrade not found" });
  }
};

export default {
  getQualificationGrades,
  getQualificationGrade,
  createQualificationGrade,
  updateQualificationGrade,
  deleteQualificationGrade,
};
