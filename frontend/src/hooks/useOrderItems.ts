import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItemInterface } from "../types/orderItem";
import {
  fetchOrderItems,
  addOrderItem,
  editOrderItem,
  removeOrderItem,
} from "../api/orderItems";
import {
  mapFromApiOrderItem,
  mapToApiOrderItem,
} from "../utils/orderItemMapper";

export const useOrderItems = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["orderItems"],
    queryFn: async () => {
      const result = await fetchOrderItems();
      return result.map(mapFromApiOrderItem);
    },
  });

  const createOrderItem = useMutation({
    mutationFn: async (orderItem: OrderItemInterface) =>
      addOrderItem(mapToApiOrderItem(orderItem)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
  });

  const updateOrderItem = useMutation({
    mutationFn: async (orderItem: OrderItemInterface) =>
      editOrderItem(mapToApiOrderItem(orderItem)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
  });

  const deleteOrderItem = useMutation({
    mutationFn: async (id: number) => removeOrderItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
  };
};
