import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiReferenceSource } from "../types/referenceSource";
const endpoint = "referenceSources";

export const fetchReferenceSources = () =>
  fetchAll<ApiReferenceSource>(endpoint);
export const addReferenceSource = (
  referenceSource: ApiReferenceSource
) => addItem(endpoint, referenceSource);
export const editReferenceSource = (
  referenceSource: ApiReferenceSource
) => updateItem(endpoint, referenceSource);
export const removeReferenceSource = (id: number) =>
  deleteItem(endpoint, id);
