import { DepartmentInterface, ApiDepartment } from "../types/department";

export const mapToApiDepartment = (department: DepartmentInterface) => ({
  id: department.id,
  name: department.departmentName,
});

export const mapFromApiDepartment = (
  department: ApiDepartment
): DepartmentInterface => ({
  id: department.id,
  departmentName: department.name,
});
