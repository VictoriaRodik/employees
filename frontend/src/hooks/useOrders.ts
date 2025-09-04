import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderInterface } from "../types/order";
import { mapFromApiOrder, mapToApiOrder } from "../utils/orderMapper";
import { fetchOrders, addOrder, editOrder, removeOrder } from "../api/orders";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const result = await fetchOrders();
        return result.map(mapFromApiOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },
  });

  const createOrder = useMutation({
    mutationFn: async (order: OrderInterface) => {
      await addOrder(mapToApiOrder(order));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const updateOrder = useMutation({
    mutationFn: async (order: OrderInterface) => {
      await editOrder(mapToApiOrder(order));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const deleteOrder = useMutation({
    mutationFn: async (id: number) => {
      await removeOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};
