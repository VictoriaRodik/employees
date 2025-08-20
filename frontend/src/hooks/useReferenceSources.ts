import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { ReferenceSourceInterface } from "../types/referenceSource";
import {
  mapFromApiReferenceSource,
  mapToApiReferenceSource,
} from "../utils/referenceSourceMapper";

const API_URL = import.meta.env.VITE_API_URL + "/referenceSources";

export const useReferenceSources = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["referenceSources"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiReferenceSource);
    },
  });

  const createReferenceSource = useMutation({
    mutationFn: async (referenceSource: ReferenceSourceInterface) => {
      await axios.post(API_URL, mapToApiReferenceSource(referenceSource));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referenceSources"] });
    },
  });

  const updateReferenceSource = useMutation({
    mutationFn: async (referenceSource: ReferenceSourceInterface) => {
      const { id, ...data } = mapToApiReferenceSource(referenceSource);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referenceSources"] });
    },
  });

  const deleteReferenceSource = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
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
