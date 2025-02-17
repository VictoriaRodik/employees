import axios from "axios";
import { EmployeeInterface } from "../types/employee";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchEmployees = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/employees`);
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addEmployee = async (employee: EmployeeInterface) => {
  try {
    const { data } = await axios.post(`${API_URL}/employees`, employee);
    return data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployee = async (updatedEmployee: EmployeeInterface) => {
  try {
    const { data } = await axios.put<EmployeeInterface>(`${API_URL}/employees/${updatedEmployee.id}`, updatedEmployee);
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/employees/${id}`);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
