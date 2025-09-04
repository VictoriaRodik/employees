import { WorkScheduleRepository } from '../repositories/workScheduleRepository.js';

const workScheduleRepository = new WorkScheduleRepository();

export const getAllWorkSchedules = async () => {
  return await workScheduleRepository.getAll();
};

export const getWorkScheduleById = async (id) => {
  const workSchedule = await workScheduleRepository.getById(id);
  if (!workSchedule) throw new Error('Work schedule not found');
  return workSchedule;
};

export const createWorkSchedule = async (data) => {
  return await workScheduleRepository.create(data);
};

export const updateWorkSchedule = async (id, data) => {
  return await workScheduleRepository.update(id, data);
};

export const deleteWorkSchedule = async (id) => {
  return await workScheduleRepository.delete(id);
};

