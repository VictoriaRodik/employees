import { DepartmentInterface } from "../types/department";

export const departmentFormatted = (
  department?: Partial<DepartmentInterface>
): DepartmentInterface => ({
  id: department?.id ?? 0,
  departmentName: department?.departmentName ?? "New Department",
});
