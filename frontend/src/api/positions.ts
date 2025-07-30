import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { PositionInterface } from "../types/position";

const endpoint = "positions";

export const fetchPositions = () => fetchAll<PositionInterface>(endpoint);
export const addPosition = (position: PositionInterface) =>
  addItem(endpoint, position);
export const updatePosition = (position: PositionInterface) =>
  updateItem(endpoint, position);
export const deletePosition = (id: number) => deleteItem(endpoint, id);
