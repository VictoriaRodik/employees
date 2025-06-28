import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { EmployeeInterface } from "../types/employee";

const endpoint = "employees";

export const fetchEmployees = () => fetchAll<EmployeeInterface>(endpoint);
export const addEmployee = (employee: EmployeeInterface) =>
  addItem(endpoint, employee);
export const updateEmployee = (employee: EmployeeInterface) =>
  updateItem(endpoint, employee);
export const deleteEmployee = (id: number) => deleteItem(endpoint, id);
