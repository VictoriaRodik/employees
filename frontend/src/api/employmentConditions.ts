import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { EmploymentConditionInterface } from "../types/employmentCondition";

const endpoint = "employmentConditions";

export const fetchEmploymentConditions = () =>
  fetchAll<EmploymentConditionInterface>(endpoint);
export const addEmploymentCondition = (
  employmentCondition: EmploymentConditionInterface
) => addItem(endpoint, employmentCondition);
export const updateEmploymentCondition = (
  employmentCondition: EmploymentConditionInterface
) => updateItem(endpoint, employmentCondition);
export const deleteEmploymentCondition = (id: number) =>
  deleteItem(endpoint, id);
