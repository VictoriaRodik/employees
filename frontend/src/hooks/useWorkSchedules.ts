import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkScheduleInterface } from "../types/workSchedule";
import {
  mapFromApiWorkSchedule,
  mapToApiWorkSchedule,
} from "../utils/workScheduleMapper";
import {
  fetchWorkSchedules,
  addWorkSchedule,
  editWorkSchedule,
  removeWorkSchedule,
} from "../api/workSchedules";

export const useWorkSchedules = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workSchedules"],
    queryFn: async () => {
      try {
        const result = await fetchWorkSchedules();
        return result.map(mapFromApiWorkSchedule);
      } catch (error) {
        console.error("Error fetching work schedules:", error);
        throw error;
      }
    },
  });

  const createWorkSchedule = useMutation({
    mutationFn: async (workSchedule: WorkScheduleInterface) => {
      await addWorkSchedule(mapToApiWorkSchedule(workSchedule));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSchedules"] });
    },
  });

  const updateWorkSchedule = useMutation({
    mutationFn: async (workSchedule: WorkScheduleInterface) => {
      await editWorkSchedule(mapToApiWorkSchedule(workSchedule));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSchedules"] });
    },
  });

  const deleteWorkSchedule = useMutation({
    mutationFn: async (id: number) => {
      await removeWorkSchedule(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSchedules"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createWorkSchedule,
    updateWorkSchedule,
    deleteWorkSchedule,
  };
};
