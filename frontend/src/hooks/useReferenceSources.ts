import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReferenceSourceInterface } from "../types/referenceSource";
import {
  mapFromApiReferenceSource,
  mapToApiReferenceSource,
} from "../utils/referenceSourceMapper";
import {
  fetchReferenceSources,
  addReferenceSource,
  editReferenceSource,
  removeReferenceSource,
} from "../api/referenceSources";

export const useReferenceSources = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["referenceSources"],
    queryFn: async () => {
      try {
        const result = await fetchReferenceSources();
        return result.map(mapFromApiReferenceSource);
      } catch (error) {
        console.error("Error fetching reference sources:", error);
        throw error;
      }
    },
  });

  const createReferenceSource = useMutation({
    mutationFn: async (referenceSource: ReferenceSourceInterface) => {
      await addReferenceSource(mapToApiReferenceSource(referenceSource));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referenceSources"] });
    },
  });

  const updateReferenceSource = useMutation({
    mutationFn: async (referenceSource: ReferenceSourceInterface) => {
      await editReferenceSource(mapToApiReferenceSource(referenceSource));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referenceSources"] });
    },
  });

  const deleteReferenceSource = useMutation({
    mutationFn: async (id: number) => {
      await removeReferenceSource(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referenceSources"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createReferenceSource,
    updateReferenceSource,
    deleteReferenceSource,
  };
};
