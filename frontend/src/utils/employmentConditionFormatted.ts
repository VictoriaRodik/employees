import { EmploymentConditionInterface } from "../types/employmentCondition";

export const employmentConditionFormatted = (
  employmentCondition?: Partial<EmploymentConditionInterface>
): EmploymentConditionInterface => ({
  id: employmentCondition?.id ?? 0,
  employmentConditionName: employmentCondition?.employmentConditionName ?? "New EmploymentCondition",
});
