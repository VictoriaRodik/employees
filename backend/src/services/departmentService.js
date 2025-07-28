import { DepartmentRepository } from '../repositories/departmentRepository.js';

const departmentRepository = new DepartmentRepository();

export const getAllDepartments = async () => {
  return await departmentRepository.getAll();
};

export const getDepartmentById = async (id) => {
  const department = await departmentRepository.getById(id);
  if (!department) throw new Error('Department not found');
  return department;
};

export const createDepartment = async (data) => {
  return await departmentRepository.create(data);
};

export const updateDepartment = async (id, data) => {
  return await departmentRepository.update(id, data);
};

export const deleteDepartment = async (id) => {
  return await departmentRepository.delete(id);
};
