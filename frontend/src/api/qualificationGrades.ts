import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiQualificationGrade } from "../types/qualificationGrade";
const endpoint = "qualificationGrades";

export const fetchQualificationGrades = () =>
  fetchAll<ApiQualificationGrade>(endpoint);
export const addQualificationGrade = (
  qualificationGrade: ApiQualificationGrade
) => addItem(endpoint, qualificationGrade);
export const editQualificationGrade = (
  qualificationGrade: ApiQualificationGrade
) => updateItem(endpoint, qualificationGrade);
export const removeQualificationGrade = (id: number) =>
  deleteItem(endpoint, id);
