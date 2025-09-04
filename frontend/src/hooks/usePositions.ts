import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PositionInterface } from "../types/position";
import { mapFromApiPosition, mapToApiPosition } from "../utils/positionMapper";
import {
  fetchPositions,
  addPosition,
  editPosition,
  removePosition,
} from "../api/positions";

export const usePositions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      try {
        const result = await fetchPositions();
        return result.map(mapFromApiPosition);
      } catch (error) {
        console.error("Error fetching positions:", error);
        throw error;
      }
    },
  });

  const createPosition = useMutation({
    mutationFn: async (position: PositionInterface) => {
      await addPosition(mapToApiPosition(position));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const updatePosition = useMutation({
    mutationFn: async (position: PositionInterface) => {
      await editPosition(mapToApiPosition(position));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const deletePosition = useMutation({
    mutationFn: async (id: number) => {
      await removePosition(id);
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
