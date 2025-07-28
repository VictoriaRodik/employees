import { EmploymentConditionRepository } from '../repositories/employmentConditionRepository.js';

const employmentConditionRepository = new EmploymentConditionRepository();

export const getAllEmploymentConditions = async () => {
  return await employmentConditionRepository.getAll();
};

export const getEmploymentConditionById = async (id) => {
  const employmentCondition = await employmentConditionRepository.getById(id);
  if (!employmentCondition) throw new Error('Employment Condition not found');
  return employmentCondition;
};

export const createEmploymentCondition = async (data) => {
  return await employmentConditionRepository.create(data);
};

export const updateEmploymentCondition = async (id, data) => {
  return await employmentConditionRepository.update(id, data);
};

export const deleteEmploymentCondition = async (id) => {
  return await employmentConditionRepository.delete(id);
};

