import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EmploymentTypeInterface } from "../types/employmentType";
import {
  mapFromApiEmploymentType,
  mapToApiEmploymentType,
} from "../utils/employmentTypeMapper";
import {
  fetchEmploymentTypes,
  addEmploymentType,
  editEmploymentType,
  removeEmploymentType,
} from "../api/employmentTypes";

export const useEmploymentTypes = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employmentTypes"],
    queryFn: async () => {
      try {
        const result = await fetchEmploymentTypes();
        return result.map(mapFromApiEmploymentType);
      } catch (error) {
        console.error("Error fetching employment types:", error);
        throw error;
      }
    },
  });

  const createEmploymentType = useMutation({
    mutationFn: async (employmentType: EmploymentTypeInterface) => {
      await addEmploymentType(mapToApiEmploymentType(employmentType));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentTypes"] });
    },
  });

  const updateEmploymentType = useMutation({
    mutationFn: async (employmentType: EmploymentTypeInterface) => {
      await editEmploymentType(mapToApiEmploymentType(employmentType));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentTypes"] });
    },
  });

  const deleteEmploymentType = useMutation({
    mutationFn: async (id: number) => {
      await removeEmploymentType(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentTypes"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createEmploymentType,
    updateEmploymentType,
    deleteEmploymentType,
  };
};
