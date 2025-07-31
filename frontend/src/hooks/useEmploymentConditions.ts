import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { EmploymentConditionInterface } from "../types/employmentCondition";
import {
  mapFromApiEmploymentCondition,
  mapToApiEmploymentCondition,
} from "../utils/employmentConditionMapper";

const API_URL = import.meta.env.VITE_API_URL + "/employmentConditions";

export const useEmploymentConditions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employmentConditions"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiEmploymentCondition);
    },
  });

  const createEmploymentCondition = useMutation({
    mutationFn: async (employmentCondition: EmploymentConditionInterface) => {
      await axios.post(
        API_URL,
        mapToApiEmploymentCondition(employmentCondition)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentConditions"] });
    },
  });

  const updateEmploymentCondition = useMutation({
    mutationFn: async (employmentCondition: EmploymentConditionInterface) => {
      const { id, ...data } = mapToApiEmploymentCondition(employmentCondition);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentConditions"] });
    },
  });

  const deleteEmploymentCondition = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentConditions"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createEmploymentCondition,
    updateEmploymentCondition,
    deleteEmploymentCondition,
  };
};
