import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { WorkScheduleInterface } from "../types/workSchedule";
import {
  mapFromApiWorkSchedule,
  mapToApiWorkSchedule,
} from "../utils/workScheduleMapper";

const API_URL = import.meta.env.VITE_API_URL + "/workSchedules";

export const useWorkSchedules = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workSchedules"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiWorkSchedule);
    },
  });

  const createWorkSchedule = useMutation({
    mutationFn: async (workSchedule: WorkScheduleInterface) => {
      await axios.post(
        API_URL,
        mapToApiWorkSchedule(workSchedule)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSchedules"] });
    },
  });

  const updateWorkSchedule = useMutation({
    mutationFn: async (workSchedule: WorkScheduleInterface) => {
      const { id, ...data } = mapToApiWorkSchedule(workSchedule);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSchedules"] });
    },
  });

  const deleteWorkSchedule = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
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
