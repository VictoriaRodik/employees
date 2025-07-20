import { EmployeeRepository } from '../repositories/employeeRepository.js';
import pool from '../config/db.js';

const employeeRepository = new EmployeeRepository(pool);

export const getAllEmployees = async () => {
  return await employeeRepository.getAll();
};

export const getEmployeeById = async (id) => {
  const employee = await employeeRepository.getById(id);
  if (!employee) throw new Error('Employee not found');
  return employee;
};

export const createEmployee = async (data) => {
  return await employeeRepository.create(data);
};

export const updateEmployee = async (id, data) => {
  return await employeeRepository.update(id, data);
};

export const deleteEmployee = async (id) => {
  return await employeeRepository.delete(id);
};
