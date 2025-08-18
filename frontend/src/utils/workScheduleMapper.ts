import { WorkScheduleInterface, ApiWorkSchedule } from "../types/workSchedule";

export const mapToApiWorkSchedule = (workSchedule: WorkScheduleInterface) => ({
  id: workSchedule.id,
  name: workSchedule.workScheduleName,
  hours_per_week: workSchedule.hoursPerWeek,
});

export const mapFromApiWorkSchedule = (
  workSchedule: ApiWorkSchedule
): WorkScheduleInterface => ({
  id: workSchedule.id,
  workScheduleName: workSchedule.name,
  hoursPerWeek: workSchedule.hours_per_week,
});
