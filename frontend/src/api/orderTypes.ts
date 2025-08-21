import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiOrderType } from "../types/orderType";
const endpoint = "orderTypes";

export const fetchOrderTypes = () => fetchAll<ApiOrderType>(endpoint);
export const addOrderType = (orderType: ApiOrderType) =>
  addItem(endpoint, orderType);
export const editOrderType = (orderType: ApiOrderType) =>
  updateItem(endpoint, orderType);
export const removeOrderType = (id: number) => deleteItem(endpoint, id);
