import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ReferenceSourceInterface } from "../types/referenceSource";
const endpoint = "referenceSources";

export const fetchReferenceSources = () =>
  fetchAll<ReferenceSourceInterface>(endpoint);
export const addReferenceSource = (
  referenceSource: ReferenceSourceInterface
) => addItem(endpoint, referenceSource);
export const updateReferenceSource = (
  referenceSource: ReferenceSourceInterface
) => updateItem(endpoint, referenceSource);
export const deleteReferenceSource = (id: number) =>
  deleteItem(endpoint, id);
