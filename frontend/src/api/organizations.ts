import { fetchAll, addItem, updateItem, deleteItem } from "./apiService";
import { OrganizationInterface } from "../types/organization";

const endpoint = "organizations";

export const fetchOrganizations = () =>
  fetchAll<OrganizationInterface>(endpoint);
export const addOrganization = (organization: OrganizationInterface) =>
  addItem(endpoint, organization);
export const updateOrganization = (organization: OrganizationInterface) =>
  updateItem(endpoint, organization);
export const deleteOrganization = (id: number) => deleteItem(endpoint, id);
