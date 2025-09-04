import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiOrderItem } from "../types/orderItem";

const endpoint = "orderItems";

export const fetchOrderItems = () => fetchAll<ApiOrderItem>(endpoint);
export const addOrderItem = (orderItem: ApiOrderItem) =>
  addItem(endpoint, orderItem);
export const editOrderItem = (orderItem: ApiOrderItem) =>
  updateItem(endpoint, orderItem);
export const removeOrderItem = (id: number) => deleteItem(endpoint, id);
