import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { ApiOrganization } from "../types/organization";

const endpoint = "organizations";

export const fetchOrganizations = () => fetchAll<ApiOrganization>(endpoint);
export const addOrganization = (organization: ApiOrganization) =>
  addItem(endpoint, organization);
export const editOrganization = (organization: ApiOrganization) =>
  updateItem(endpoint, organization);
export const removeOrganization = (id: number) => deleteItem(endpoint, id);
