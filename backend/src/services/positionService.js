import { PositionRepository } from '../repositories/positionRepository.js';

const positionRepository = new PositionRepository();

export const getAllPositions = async () => {
  return await positionRepository.getAll();
};

export const getPositionById = async (id) => {
  const position = await positionRepository.getById(id);
  if (!position) throw new Error('Position not found');
  return position;
};

export const createPosition = async (data) => {
  return await positionRepository.create(data);
};

export const updatePosition = async (id, data) => {
  return await positionRepository.update(id, data);
};

export const deletePosition = async (id) => {
  return await positionRepository.delete(id);
};

