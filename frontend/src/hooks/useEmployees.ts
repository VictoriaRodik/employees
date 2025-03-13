import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { EmployeeInterface } from "../types/employee";
import { mapFromApiEmployee, mapToApiEmployee } from "../utils/employeeMapper";

const API_URL = import.meta.env.VITE_API_URL + "/employees";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiEmployee);
    },
  });

  const createEmployee = useMutation({
    mutationFn: async (employee: EmployeeInterface) => {
      await axios.post(API_URL, mapToApiEmployee(employee));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const updateEmployee = useMutation({
    mutationFn: async (employee: EmployeeInterface) => {
      await axios.put(`${API_URL}/${employee.id}`, mapToApiEmployee(employee));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const deleteEmployee = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
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
