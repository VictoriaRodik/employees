import { QualificationGradeRepository } from '../repositories/qualificationGradeRepository.js';

const qualificationGradeRepository = new QualificationGradeRepository();

export const getAllQualificationGrades = async () => {
  return await qualificationGradeRepository.getAll();
};

export const getQualificationGradeById = async (id) => {
  const qualificationGrade = await qualificationGradeRepository.getById(id);
  if (!qualificationGrade) throw new Error('Qualification grade not found');
  return qualificationGrade;
};

export const createQualificationGrade = async (data) => {
  return await qualificationGradeRepository.create(data);
};

export const updateQualificationGrade = async (id, data) => {
  return await qualificationGradeRepository.update(id, data);
};

export const deleteQualificationGrade = async (id) => {
  return await qualificationGradeRepository.delete(id);
};

