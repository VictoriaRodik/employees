import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiDepartment } from "../types/department";

const endpoint = "departments";

export const fetchDepartments = () => fetchAll<ApiDepartment>(endpoint);
export const addDepartment = (department: ApiDepartment) =>
  addItem(endpoint, department);
export const editDepartment = (department: ApiDepartment) =>
  updateItem(endpoint, department);
export const removeDepartment = (id: number) => deleteItem(endpoint, id);
