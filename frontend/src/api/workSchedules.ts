import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiWorkSchedule } from "../types/workSchedule";
const endpoint = "workSchedules";

export const fetchWorkSchedules = () =>
  fetchAll<ApiWorkSchedule>(endpoint);
export const addWorkSchedule = (
  workSchedule: ApiWorkSchedule
) => addItem(endpoint, workSchedule);
export const editWorkSchedule = (
  workSchedule: ApiWorkSchedule
) => updateItem(endpoint, workSchedule);
export const removeWorkSchedule = (id: number) =>
  deleteItem(endpoint, id);
