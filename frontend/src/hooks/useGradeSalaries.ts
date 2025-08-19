import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { GradeSalaryInterface } from "../types/gradeSalary";
import {
  mapFromApiGradeSalary,
  mapToApiGradeSalary,
} from "../utils/gradeSalaryMapper";

const API_URL = import.meta.env.VITE_API_URL + "/gradeSalaries";

export const useGradeSalaries = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gradeSalaries"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiGradeSalary);
    },
  });

  const createGradeSalary = useMutation({
    mutationFn: async (gradeSalary: GradeSalaryInterface) => {
      await axios.post(API_URL, mapToApiGradeSalary(gradeSalary));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gradeSalaries"] });
    },
  });

  const updateGradeSalary = useMutation({
    mutationFn: async (gradeSalary: GradeSalaryInterface) => {
      const { id, ...data } = mapToApiGradeSalary(gradeSalary);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gradeSalaries"] });
    },
  });

  const deleteGradeSalary = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gradeSalaries"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createGradeSalary,
    updateGradeSalary,
    deleteGradeSalary,
  };
};
