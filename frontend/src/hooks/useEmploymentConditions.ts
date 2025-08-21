import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EmploymentConditionInterface } from "../types/employmentCondition";
import {
  mapFromApiEmploymentCondition,
  mapToApiEmploymentCondition,
} from "../utils/employmentConditionMapper";
import {
  fetchEmploymentConditions,
  addEmploymentCondition,
  editEmploymentCondition,
  removeEmploymentCondition,
} from "../api/employmentConditions";

export const useEmploymentConditions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employmentConditions"],
    queryFn: async () => {
      try {
        const result = await fetchEmploymentConditions();
        return result.map(mapFromApiEmploymentCondition);
      } catch (error) {
        console.error("Error fetching employment conditions:", error);
        throw error;
      }
    },
  });

  const createEmploymentCondition = useMutation({
    mutationFn: async (employmentCondition: EmploymentConditionInterface) => {
      await addEmploymentCondition(
        mapToApiEmploymentCondition(employmentCondition)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentConditions"] });
    },
  });

  const updateEmploymentCondition = useMutation({
    mutationFn: async (employmentCondition: EmploymentConditionInterface) => {
      await editEmploymentCondition(
        mapToApiEmploymentCondition(employmentCondition)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentConditions"] });
    },
  });

  const deleteEmploymentCondition = useMutation({
    mutationFn: async (id: number) => {
      await removeEmploymentCondition(id);
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
