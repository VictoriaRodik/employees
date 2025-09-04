import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiEmployee } from "../types/employee";

const endpoint = "employees";

export const fetchEmployees = () => fetchAll<ApiEmployee>(endpoint);
export const addEmployee = (employee: ApiEmployee) =>
  addItem(endpoint, employee);
export const editEmployee = (employee: ApiEmployee) =>
  updateItem(endpoint, employee);
export const removeEmployee = (id: number) => deleteItem(endpoint, id);
