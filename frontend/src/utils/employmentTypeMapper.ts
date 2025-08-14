import { EmploymentTypeInterface, ApiEmploymentType } from "../types/employmentType";

export const mapToApiEmploymentType = (employmentType: EmploymentTypeInterface) => ({
  id: employmentType.id,
  name: employmentType.employmentTypeName,
});

export const mapFromApiEmploymentType = (
  employmentType: ApiEmploymentType
): EmploymentTypeInterface => ({
  id: employmentType.id,
  employmentTypeName: employmentType.name,
});
