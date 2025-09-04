import { QualificationGradeInterface, ApiQualificationGrade } from "../types/qualificationGrade";

export const mapToApiQualificationGrade = (qualificationGrade: QualificationGradeInterface) => ({
  id: qualificationGrade.id,
  grade: qualificationGrade.grade,
});

export const mapFromApiQualificationGrade = (
  qualificationGrade: ApiQualificationGrade
): QualificationGradeInterface => ({
  id: qualificationGrade.id,
  grade: qualificationGrade.grade,
});
