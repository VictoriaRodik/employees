import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiEmploymentCondition } from "../types/employmentCondition";

const endpoint = "employmentConditions";

export const fetchEmploymentConditions = () =>
  fetchAll<ApiEmploymentCondition>(endpoint);
export const addEmploymentCondition = (
  employmentCondition: ApiEmploymentCondition
) => addItem(endpoint, employmentCondition);
export const editEmploymentCondition = (
  employmentCondition: ApiEmploymentCondition
) => updateItem(endpoint, employmentCondition);
export const removeEmploymentCondition = (id: number) =>
  deleteItem(endpoint, id);
