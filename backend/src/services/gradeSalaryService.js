import { GradeSalaryRepository } from '../repositories/gradeSalaryRepository.js';

const gradeSalaryRepository = new GradeSalaryRepository();

export const getAllGradeSalaries = async () => {
  return await gradeSalaryRepository.getAll();
};

export const getGradeSalaryById = async (id) => {
  const gradeSalary = await gradeSalaryRepository.getById(id);
  if (!gradeSalary) throw new Error('Grade salary not found');
  return gradeSalary;
};

export const createGradeSalary = async (data) => {
  return await gradeSalaryRepository.create(data);
};

export const updateGradeSalary = async (id, data) => {
  return await gradeSalaryRepository.update(id, data);
};

export const deleteGradeSalary = async (id) => {
  return await gradeSalaryRepository.delete(id);
};


