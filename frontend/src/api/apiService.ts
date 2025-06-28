import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAll = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/${endpoint}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const addItem = async <T>(endpoint: string, item: T): Promise<T> => {
  try {
    const { data } = await axios.post(`${API_URL}/${endpoint}`, item);
    return data;
  } catch (error) {
    console.error(`Error adding to ${endpoint}:`, error);
    throw error;
  }
};

export const updateItem = async <T extends { id: number }>(
  endpoint: string,
  item: T
): Promise<T> => {
  try {
    const { data } = await axios.put(`${API_URL}/${endpoint}/${item.id}`, item);
    return data;
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
};

export const deleteItem = async (
  endpoint: string,
  id: number
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${endpoint}/${id}`);
  } catch (error) {
    console.error(`Error deleting from ${endpoint}:`, error);
    throw error;
  }
};
