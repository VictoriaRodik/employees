import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { GradeSalaryInterface } from "../types/gradeSalary";
const endpoint = "gradeSalaries";

export const fetchGradeSalaries = () =>
  fetchAll<GradeSalaryInterface>(endpoint);
export const addGradeSalary = (gradeSalary: GradeSalaryInterface) =>
  addItem(endpoint, gradeSalary);
export const updateGradeSalary = (gradeSalary: GradeSalaryInterface) =>
  updateItem(endpoint, gradeSalary);
export const deleteGradeSalary = (id: number) => deleteItem(endpoint, id);
