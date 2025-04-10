import axios from "axios";
import { OrganizationInterface } from "../types/organization";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchOrganizations = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/organizations`);
    return data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

export const addOrganization = async (organization: OrganizationInterface) => {
  try {
    const { data } = await axios.post(`${API_URL}/organizations`, organization);
    return data;
  } catch (error) {
    console.error("Error adding organization:", error);
    throw error;
  }
};

export const updateOrganization = async (updatedOrganization: OrganizationInterface) => {
  try {
    const { data } = await axios.put<OrganizationInterface>(`${API_URL}/organizations/${updatedOrganization.id}`, updatedOrganization);
    return data;
  } catch (error) {
    console.error("Error updating organization:", error);
    throw error;
  }
};

export const deleteOrganization = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/organizations/${id}`);
  } catch (error) {
    console.error("Error deleting organization:", error);
    throw error;
  }
};
