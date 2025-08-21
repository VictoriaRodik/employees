import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiEmploymentType } from "../types/employmentType";
const endpoint = "employmentTypes";

export const fetchEmploymentTypes = () =>
  fetchAll<ApiEmploymentType>(endpoint);
export const addEmploymentType = (
  employmentType: ApiEmploymentType
) => addItem(endpoint, employmentType);
export const editEmploymentType = (
  employmentType: ApiEmploymentType
) => updateItem(endpoint, employmentType);
export const removeEmploymentType = (id: number) =>
  deleteItem(endpoint, id);
