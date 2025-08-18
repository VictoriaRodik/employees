import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { QualificationGradeInterface } from "../types/qualificationGrade";
const endpoint = "qualificationGrades";

export const fetchQualificationGrades = () =>
  fetchAll<QualificationGradeInterface>(endpoint);
export const addQualificationGrade = (
  qualificationGrade: QualificationGradeInterface
) => addItem(endpoint, qualificationGrade);
export const updateQualificationGrade = (
  qualificationGrade: QualificationGradeInterface
) => updateItem(endpoint, qualificationGrade);
export const deleteQualificationGrade = (id: number) =>
  deleteItem(endpoint, id);
