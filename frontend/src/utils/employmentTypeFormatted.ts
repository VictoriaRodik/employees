import { EmploymentTypeInterface } from "../types/employmentType";

export const employmentTypeFormatted = (
  employmentType?: Partial<EmploymentTypeInterface>
): EmploymentTypeInterface => ({
  id: employmentType?.id ?? 0,
  employmentTypeName:
    employmentType?.employmentTypeName ?? "New EmploymentType",
});
