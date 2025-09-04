import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GradeSalaryInterface } from "../types/gradeSalary";
import {
  mapFromApiGradeSalary,
  mapToApiGradeSalary,
} from "../utils/gradeSalaryMapper";
import {
  fetchGradeSalaries,
  addGradeSalary,
  editGradeSalary,
  removeGradeSalary,
} from "../api/gradeSalaries";

export const useGradeSalaries = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gradeSalaries"],
    queryFn: async () => {
      try {
        const result = await fetchGradeSalaries();
        return result.map(mapFromApiGradeSalary);
      } catch (error) {
        console.error("Error fetching grade salaries:", error);
        throw error;
      }
    },
  });

  const createGradeSalary = useMutation({
    mutationFn: async (gradeSalary: GradeSalaryInterface) => {
      await addGradeSalary(mapToApiGradeSalary(gradeSalary));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gradeSalaries"] });
    },
  });

  const updateGradeSalary = useMutation({
    mutationFn: async (gradeSalary: GradeSalaryInterface) => {
      await editGradeSalary(mapToApiGradeSalary(gradeSalary));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gradeSalaries"] });
    },
  });

  const deleteGradeSalary = useMutation({
    mutationFn: async (id: number) => {
      await removeGradeSalary(id);
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
