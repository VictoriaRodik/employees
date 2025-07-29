import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { DepartmentInterface } from "../types/department";
import { mapFromApiDepartment, mapToApiDepartment } from "../utils/departmentMapper";

const API_URL = import.meta.env.VITE_API_URL + "/departments";

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiDepartment);
    },
  });

  const createDepartment = useMutation({
    mutationFn: async (department: DepartmentInterface) => {
      await axios.post(API_URL, mapToApiDepartment(department));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const updateDepartment = useMutation({
    mutationFn: async (department: DepartmentInterface) => {
      const { id, ...data } = mapToApiDepartment(department);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
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
