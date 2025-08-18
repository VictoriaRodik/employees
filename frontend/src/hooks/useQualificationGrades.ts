import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { QualificationGradeInterface } from "../types/qualificationGrade";
import {
  mapFromApiQualificationGrade,
  mapToApiQualificationGrade,
} from "../utils/qualificationGradeMapper";

const API_URL = import.meta.env.VITE_API_URL + "/qualificationGrades";

export const useQualificationGrades = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["qualificationGrades"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiQualificationGrade);
    },
  });

  const createQualificationGrade = useMutation({
    mutationFn: async (qualificationGrade: QualificationGradeInterface) => {
      await axios.post(API_URL, mapToApiQualificationGrade(qualificationGrade));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualificationGrades"] });
    },
  });

  const updateQualificationGrade = useMutation({
    mutationFn: async (qualificationGrade: QualificationGradeInterface) => {
      const { id, ...data } = mapToApiQualificationGrade(qualificationGrade);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualificationGrades"] });
    },
  });

  const deleteQualificationGrade = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualificationGrades"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createQualificationGrade,
    updateQualificationGrade,
    deleteQualificationGrade,
  };
};
