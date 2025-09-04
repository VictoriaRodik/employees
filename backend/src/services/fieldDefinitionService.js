import { FieldDefinitionRepository } from '../repositories/fieldDefinitionRepository.js';

const fieldDefinitionRepository = new FieldDefinitionRepository();

export const getAllFieldDefinitions = async () => {
  return await fieldDefinitionRepository.getAll();
};

export const getFieldDefinitionById = async (id) => {
  const fieldDefinition = await fieldDefinitionRepository.getById(id);
  if (!fieldDefinition) throw new Error('Field definition not found');
  return fieldDefinition;
};

export const createFieldDefinition = async (data) => {
  return await fieldDefinitionRepository.create(data);
};

export const updateFieldDefinition = async (id, data) => {
  return await fieldDefinitionRepository.update(id, data);
};

export const deleteFieldDefinition = async (id) => {
  return await fieldDefinitionRepository.delete(id);
};


