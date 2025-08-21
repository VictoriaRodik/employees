import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeInterface } from "../types/employee";
import { mapFromApiEmployee, mapToApiEmployee } from "../utils/employeeMapper";
import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../api/employees";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const result = await fetchEmployees();
        return result.map(mapFromApiEmployee);
      } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
      }
    },
  });

  const createEmployee = useMutation({
    mutationFn: async (employee: EmployeeInterface) => {
      await addEmployee(mapToApiEmployee(employee));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const updateEmployee = useMutation({
    mutationFn: async (employee: EmployeeInterface) => {
      await editEmployee(mapToApiEmployee(employee));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const deleteEmployee = useMutation({
    mutationFn: async (id: number) => {
      await removeEmployee(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
