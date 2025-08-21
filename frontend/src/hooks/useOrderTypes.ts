import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderTypeInterface } from "../types/orderType";
import {
  fetchOrderTypes,
  addOrderType,
  editOrderType,
  removeOrderType,
} from "../api/orderTypes";
import {
  mapFromApiOrderType,
  mapToApiOrderType,
} from "../utils/orderTypeMapper";

export const useOrderTypes = () => {
  const queryClient = useQueryClient();


  const { data, isLoading, error } = useQuery({
    queryKey: ["orderTypes"],
    queryFn: async () => {
      const result = await fetchOrderTypes();
      return result.map(mapFromApiOrderType);
    },
  });


  const createOrderType = useMutation({
    mutationFn: async (orderType: OrderTypeInterface) =>
      addOrderType(mapToApiOrderType(orderType)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderTypes"] });
    },
  });


  const updateOrderType = useMutation({
    mutationFn: async (orderType: OrderTypeInterface) =>
      editOrderType(mapToApiOrderType(orderType)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderTypes"] });
    },
  });


  const deleteOrderType = useMutation({
    mutationFn: async (id: number) => removeOrderType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderTypes"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createOrderType,
    updateOrderType,
    deleteOrderType,
  };
};
