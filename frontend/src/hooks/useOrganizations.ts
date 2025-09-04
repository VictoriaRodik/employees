import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { OrganizationInterface } from "../types/organization";
import {
  mapFromApiOrganization,
  mapToApiOrganization,
} from "../utils/organizationMapper";

import {
  fetchOrganizations,
  addOrganization,
  editOrganization,
  removeOrganization,
} from "../api/organizations";

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      try {
        const result = await fetchOrganizations();
        return result.map(mapFromApiOrganization);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        throw error;
      }
    },
  });

  const createOrganization = useMutation({
    mutationFn: async (organization: OrganizationInterface) => {
      await addOrganization(mapToApiOrganization(organization));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const updateOrganization = useMutation({
    mutationFn: async (organization: OrganizationInterface) => {
      await editOrganization(mapToApiOrganization(organization));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const deleteOrganization = useMutation({
    mutationFn: async (id: number) => {
      await removeOrganization(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  };
};
