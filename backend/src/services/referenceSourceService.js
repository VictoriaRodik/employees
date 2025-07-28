import { ReferenceSourceRepository } from '../repositories/referenceSourceRepository.js';

const referenceSourceRepository = new ReferenceSourceRepository();

export const getAllReferenceSources = async () => {
  return await referenceSourceRepository.getAll();
};

export const getReferenceSourceById = async (id) => {
  const referenceSource = await referenceSourceRepository.getById(id);
  if (!referenceSource) throw new Error('Reference source not found');
  return referenceSource;
};

export const createReferenceSource = async (data) => {
  return await referenceSourceRepository.create(data);
};

export const updateReferenceSource = async (id, data) => {
  return await referenceSourceRepository.update(id, data);
};

export const deleteReferenceSource = async (id) => {
  return await referenceSourceRepository.delete(id);
};

