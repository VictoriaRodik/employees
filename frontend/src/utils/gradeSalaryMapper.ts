import { GradeSalaryInterface, ApiGradeSalary } from "../types/gradeSalary";

export const mapToApiGradeSalary = (gradeSalary: GradeSalaryInterface) => ({
  id: gradeSalary.id,
  grade_id: gradeSalary.gradeId,
  base_salary: gradeSalary.baseSalary,
  effective_from: gradeSalary.effectiveFrom,
});

export const mapFromApiGradeSalary = (
  gradeSalary: ApiGradeSalary
): GradeSalaryInterface => ({
  id: gradeSalary.id,
  gradeId: gradeSalary.grade_id,
  baseSalary: gradeSalary.base_salary,
  effectiveFrom: gradeSalary.effective_from,
});
