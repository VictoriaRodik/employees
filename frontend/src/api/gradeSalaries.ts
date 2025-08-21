import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiGradeSalary } from "../types/gradeSalary";
const endpoint = "gradeSalaries";

export const fetchGradeSalaries = () => fetchAll<ApiGradeSalary>(endpoint);
export const addGradeSalary = (gradeSalary: ApiGradeSalary) =>
  addItem(endpoint, gradeSalary);
export const editGradeSalary = (gradeSalary: ApiGradeSalary) =>
  updateItem(endpoint, gradeSalary);
export const removeGradeSalary = (id: number) => deleteItem(endpoint, id);
