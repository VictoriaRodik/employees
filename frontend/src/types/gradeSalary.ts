export interface GradeSalaryInterface {
  id: number;
  gradeId: number;
  grade: string;
  baseSalary: number;
  effectiveFrom: string;
}

export interface ApiGradeSalary {
  id: number;
  grade_id: number;
  grade: string;
  base_salary: number;
  effective_from: string;
}