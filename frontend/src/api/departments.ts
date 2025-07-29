import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { DepartmentInterface } from "../types/department";

const endpoint = "departments";

export const fetchDepartments = () => fetchAll<DepartmentInterface>(endpoint);
export const addDepartment = (department: DepartmentInterface) =>
  addItem(endpoint, department);
export const updateDepartment = (department: DepartmentInterface) =>
  updateItem(endpoint, department);
export const deleteDepartment = (id: number) => deleteItem(endpoint, id);
