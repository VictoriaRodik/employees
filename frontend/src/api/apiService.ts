import axios from "./axiosInstance";

export const fetchAll = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const { data } = await axios.get(`/${endpoint}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const addItem = async <T>(endpoint: string, item: T): Promise<T> => {
  try {
    const { data } = await axios.post(`/${endpoint}`, item);
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
    const { data } = await axios.put(`/${endpoint}/${item.id}`, item);
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
    await axios.delete(`/${endpoint}/${id}`);
  } catch (error) {
    console.error(`Error deleting from ${endpoint}:`, error);
    throw error;
  }
};
