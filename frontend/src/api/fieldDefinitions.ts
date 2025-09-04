import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiFieldDefinition } from "../types/fieldDefinition";
const endpoint = "fieldDefinitions";

export const fetchFieldDefinitions = () =>
  fetchAll<ApiFieldDefinition>(endpoint);
export const addFieldDefinition = (fieldDefinition: ApiFieldDefinition) =>
  addItem(endpoint, fieldDefinition);
export const editFieldDefinition = (fieldDefinition: ApiFieldDefinition) =>
  updateItem(endpoint, fieldDefinition);
export const removeFieldDefinition = (id: number) => deleteItem(endpoint, id);
