import { EmploymentTypeRepository } from '../repositories/employmentTypeRepository.js';

const employmentTypeRepository = new EmploymentTypeRepository();

export const getAllEmploymentTypes = async () => {
  return await employmentTypeRepository.getAll();
};

export const getEmploymentTypeById = async (id) => {
  const employmentType = await employmentTypeRepository.getById(id);
  if (!employmentType) throw new Error('Employment Type not found');
  return employmentType;
};

export const createEmploymentType = async (data) => {
  return await employmentTypeRepository.create(data);
};

export const updateEmploymentType = async (id, data) => {
  return await employmentTypeRepository.update(id, data);
};

export const deleteEmploymentType = async (id) => {
  return await employmentTypeRepository.delete(id);
};

