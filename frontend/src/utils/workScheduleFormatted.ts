import { WorkScheduleInterface } from "../types/workSchedule";

export const workScheduleFormatted = (
  workSchedule?: Partial<WorkScheduleInterface>
): WorkScheduleInterface => ({
  id: workSchedule?.id ?? 0,
  workScheduleName: workSchedule?.workScheduleName ?? "New WorkSchedule",
  hoursPerWeek: workSchedule?.hoursPerWeek ?? 0,
});
