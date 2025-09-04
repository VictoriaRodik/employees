import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiPosition } from "../types/position";

const endpoint = "positions";

export const fetchPositions = () => fetchAll<ApiPosition>(endpoint);
export const addPosition = (position: ApiPosition) =>
  addItem(endpoint, position);
export const editPosition = (position: ApiPosition) =>
  updateItem(endpoint, position);
export const removePosition = (id: number) => deleteItem(endpoint, id);
