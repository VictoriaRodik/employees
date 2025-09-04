import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DepartmentInterface } from "../types/department";
import {
  mapFromApiDepartment,
  mapToApiDepartment,
} from "../utils/departmentMapper";
import {
  fetchDepartments,
  addDepartment,
  editDepartment,
  removeDepartment,
} from "../api/departments";

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      try {
        const result = await fetchDepartments();
        return result.map(mapFromApiDepartment);
      } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
      }
    },
  });

  const createDepartment = useMutation({
    mutationFn: async (department: DepartmentInterface) => {
      await addDepartment(mapToApiDepartment(department));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const updateDepartment = useMutation({
    mutationFn: async (department: DepartmentInterface) => {
      await editDepartment(mapToApiDepartment(department));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: async (id: number) => {
      await removeDepartment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};
