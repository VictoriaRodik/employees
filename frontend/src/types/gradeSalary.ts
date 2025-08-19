export interface GradeSalaryInterface {
  id: number;
  gradeId: number;
  baseSalary: number;
  effectiveFrom: string;
}

export interface ApiGradeSalary {
  id: number;
  grade_id: number;
  base_salary: number;
  effective_from: string;
}