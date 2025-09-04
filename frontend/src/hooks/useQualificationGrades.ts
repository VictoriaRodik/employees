import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QualificationGradeInterface } from "../types/qualificationGrade";
import {
  mapFromApiQualificationGrade,
  mapToApiQualificationGrade,
} from "../utils/qualificationGradeMapper";
import {
  fetchQualificationGrades,
  addQualificationGrade,
  editQualificationGrade,
  removeQualificationGrade,
} from "../api/qualificationGrades";

export const useQualificationGrades = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["qualificationGrades"],
    queryFn: async () => {
      try {
        const result = await fetchQualificationGrades();
        return result.map(mapFromApiQualificationGrade);
      } catch (error) {
        console.error("Error fetching qualification grades:", error);
        throw error;
      }
    },
  });

  const createQualificationGrade = useMutation({
    mutationFn: async (qualificationGrade: QualificationGradeInterface) => {
      await addQualificationGrade(
        mapToApiQualificationGrade(qualificationGrade)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualificationGrades"] });
    },
  });

  const updateQualificationGrade = useMutation({
    mutationFn: async (qualificationGrade: QualificationGradeInterface) => {
      await editQualificationGrade(
        mapToApiQualificationGrade(qualificationGrade)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualificationGrades"] });
    },
  });

  const deleteQualificationGrade = useMutation({
    mutationFn: async (id: number) => {
      await removeQualificationGrade(id);
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
