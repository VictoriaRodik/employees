import { OrganizationRepository } from '../repositories/organizationRepository.js';
import pool from '../config/db.js';

const organizationRepository = new OrganizationRepository(pool);

export const getAllOrganizations = async () => {
  return await organizationRepository.getAll();
};

export const getOrganizationById = async (id) => {
  const organization = await organizationRepository.getById(id);
  if (!organization) throw new Error('Organization not found');
  return organization;
};

export const createOrganization = async (data) => {
  return await organizationRepository.create(data);
};

export const updateOrganization = async (id, data) => {
  return await organizationRepository.update(id, data);
};

export const deleteOrganization = async (id) => {
  return await organizationRepository.delete(id);
};
