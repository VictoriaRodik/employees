import { QualificationGradeInterface } from "../types/qualificationGrade";

export const qualificationGradeFormatted = (
  qualificationGrade?: Partial<QualificationGradeInterface>
): QualificationGradeInterface => ({
  id: qualificationGrade?.id ?? 0,
  grade: qualificationGrade?.grade ?? "",
});
