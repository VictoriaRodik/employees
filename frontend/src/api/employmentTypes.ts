import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { EmploymentTypeInterface } from "../types/employmentType";
const endpoint = "employment-types";

export const fetchEmploymentTypes = () =>
  fetchAll<EmploymentTypeInterface>(endpoint);
export const addEmploymentType = (
  employmentType: EmploymentTypeInterface
) => addItem(endpoint, employmentType);
export const updateEmploymentType = (
  employmentType: EmploymentTypeInterface
) => updateItem(endpoint, employmentType);
export const deleteEmploymentType = (id: number) =>
  deleteItem(endpoint, id);
