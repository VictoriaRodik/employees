import { GradeSalaryInterface } from "../types/gradeSalary";
export const gradeSalaryFormatted = (
  gradeSalary?: Partial<GradeSalaryInterface>
): GradeSalaryInterface => ({
  id: gradeSalary?.id ?? 0,
  gradeId: gradeSalary?.gradeId ?? 0,
  grade: gradeSalary?.grade ?? "",
  baseSalary: gradeSalary?.baseSalary ?? 0,
  effectiveFrom: gradeSalary?.effectiveFrom
    ? new Date(gradeSalary.effectiveFrom).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA")
});
