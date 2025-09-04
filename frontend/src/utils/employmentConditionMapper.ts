import { EmploymentConditionInterface, ApiEmploymentCondition } from "../types/employmentCondition";

export const mapToApiEmploymentCondition = (employmentCondition: EmploymentConditionInterface) => ({
  id: employmentCondition.id,
  name: employmentCondition.employmentConditionName,
});

export const mapFromApiEmploymentCondition = (
  employmentCondition: ApiEmploymentCondition
): EmploymentConditionInterface => ({
  id: employmentCondition.id,
  employmentConditionName: employmentCondition.name,
});
