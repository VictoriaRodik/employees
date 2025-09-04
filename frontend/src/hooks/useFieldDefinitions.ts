import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldDefinitionInterface } from "../types/fieldDefinition";
import {
  mapFromApiFieldDefinition,
  mapToApiFieldDefinition,
} from "../utils/fieldDefinitionMapper";
import {
  fetchFieldDefinitions,
  addFieldDefinition,
  editFieldDefinition,
  removeFieldDefinition,
} from "../api/fieldDefinitions";

export const useFieldDefinitions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fieldDefinitions"],
    queryFn: async () => {
      try {
        const result = await fetchFieldDefinitions();
        return result.map(mapFromApiFieldDefinition);
      } catch (error) {
        console.error("Error fetching field definitions:", error);
        throw error;
      }
    },
  });

  const createFieldDefinition = useMutation({
    mutationFn: async (fieldDefinition: FieldDefinitionInterface) => {
      await addFieldDefinition(mapToApiFieldDefinition(fieldDefinition));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldDefinitions"] });
    },
  });

  const updateFieldDefinition = useMutation({
    mutationFn: async (fieldDefinition: FieldDefinitionInterface) => {
      await editFieldDefinition(mapToApiFieldDefinition(fieldDefinition));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldDefinitions"] });
    },
  });

  const deleteFieldDefinition = useMutation({
    mutationFn: async (id: number) => {
      await removeFieldDefinition(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldDefinitions"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createFieldDefinition,
    updateFieldDefinition,
    deleteFieldDefinition,
  };
};
