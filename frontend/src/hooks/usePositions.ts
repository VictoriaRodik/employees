import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axiosInstance";
import { PositionInterface } from "../types/position";
import { mapFromApiPosition, mapToApiPosition } from "../utils/positionMapper";

const API_URL = import.meta.env.VITE_API_URL + "/positions";

export const usePositions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiPosition);
    },
  });

  const createPosition = useMutation({
    mutationFn: async (position: PositionInterface) => {
      await axios.post(API_URL, mapToApiPosition(position));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const updatePosition = useMutation({
    mutationFn: async (position: PositionInterface) => {
      const { id, ...data } = mapToApiPosition(position);
      await axios.put(`${API_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const deletePosition = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createPosition,
    updatePosition,
    deletePosition,
  };
};
