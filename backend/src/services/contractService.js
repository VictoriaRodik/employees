import { ContractRepository } from '../repositories/contractRepository.js';
import pool from '../config/db.js';

const contractRepository = new ContractRepository(pool);

export const getAllContracts = async () => {
  return await contractRepository.getAll();
};

export const getContractById = async (id) => {
  const contract = await contractRepository.getById(id);
  if (!contract) throw new Error('Contract not found');
  return contract;
};

export const createContract = async (data) => {
  return await contractRepository.create(data);
};

export const updateContract = async (id, data) => {
  return await contractRepository.update(id, data);
};

export const deleteContract = async (id) => {
  return await contractRepository.delete(id);
};
