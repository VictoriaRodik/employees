import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { WorkScheduleInterface } from "../types/workSchedule";
const endpoint = "workSchedules";

export const fetchWorkSchedules = () =>
  fetchAll<WorkScheduleInterface>(endpoint);
export const addWorkSchedule = (
  workSchedule: WorkScheduleInterface
) => addItem(endpoint, workSchedule);
export const updateWorkSchedule = (
  workSchedule: WorkScheduleInterface
) => updateItem(endpoint, workSchedule);
export const deleteWorkSchedule = (id: number) =>
  deleteItem(endpoint, id);
