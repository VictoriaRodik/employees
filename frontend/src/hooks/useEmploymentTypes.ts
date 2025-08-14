import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { EmploymentTypeInterface } from "../types/employmentType";
import {
  mapFromApiEmploymentType,
  mapToApiEmploymentType,
} from "../utils/employmentTypeMapper";

const API_URL = import.meta.env.VITE_API_URL + "/employmentTypes";

export const useEmploymentTypes = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employmentTypes"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiEmploymentType);
    },
  });

  const createEmploymentType = useMutation({
    mutationFn: async (employmentType: EmploymentTypeInterface) => {
      await axios.post(
        API_URL,
        mapToApiEmploymentType(employmentType)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentTypes"] });
    },
  });

  const updateEmploymentType = useMutation({
    mutationFn: async (employmentType: EmploymentTypeInterface) => {
      const { id, ...data } = mapToApiEmploymentType(employmentType);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentTypes"] });
    },
  });

  const deleteEmploymentType = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
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
