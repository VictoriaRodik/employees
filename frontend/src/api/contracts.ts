import axios from "axios";
import { ContractInterface } from "../types/contract";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchContracts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/contracts`);
    return data;
  } catch (error) {
    console.error("Error fetching contracts:", error);
    throw error;
  }
};

export const addContract = async (contract: ContractInterface) => {
  try {
    const { data } = await axios.post(`${API_URL}/contracts`, contract);
    return data;
  } catch (error) {
    console.error("Error adding contract:", error);
    throw error;
  }
};

export const updateContract = async (updatedContract: ContractInterface) => {
  try {
    const { data } = await axios.put<ContractInterface>(`${API_URL}/contracts/${updatedContract.id}`, updatedContract);
    return data;
  } catch (error) {
    console.error("Error updating contract:", error);
    throw error;
  }
};

export const deleteContract = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/contracts/${id}`);
  } catch (error) {
    console.error("Error deleting contract:", error);
    throw error;
  }
};
