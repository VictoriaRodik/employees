import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ContractInterface } from "../types/contract";

const endpoint = "contracts";

export const fetchContracts = () => fetchAll<ContractInterface>(endpoint);
export const addContract = (contract: ContractInterface) =>
  addItem(endpoint, contract);
export const updateContract = (contract: ContractInterface) =>
  updateItem(endpoint, contract);
export const deleteContract = (id: number) => deleteItem(endpoint, id);
