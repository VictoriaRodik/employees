import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiContract } from "../types/contract";

const endpoint = "contracts";

export const fetchContracts = () => fetchAll<ApiContract>(endpoint);
export const addContract = (contract: ApiContract) =>
  addItem(endpoint, contract);
export const editContract = (contract: ApiContract) =>
  updateItem(endpoint, contract);
export const removeContract = (id: number) => deleteItem(endpoint, id);
