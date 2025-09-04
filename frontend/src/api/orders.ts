import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiOrder } from "../types/order";

const endpoint = "orders";

export const fetchOrders = () => fetchAll<ApiOrder>(endpoint);
export const addOrder = (order: ApiOrder) => addItem(endpoint, order);
export const editOrder = (order: ApiOrder) => updateItem(endpoint, order);
export const removeOrder = (id: number) => deleteItem(endpoint, id);
