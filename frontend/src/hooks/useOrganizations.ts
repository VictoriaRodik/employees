import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { OrganizationInterface } from "../types/organization";
import { mapFromApiOrganization, mapToApiOrganization } from "../utils/organizationMapper";

const API_URL = import.meta.env.VITE_API_URL + "/organizations";

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiOrganization);
    },
  });

  const createOrganization = useMutation({
    mutationFn: async (organization: OrganizationInterface) => {
      await axios.post(API_URL, mapToApiOrganization(organization));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const updateOrganization = useMutation({
    mutationFn: async (organization: OrganizationInterface) => {
      await axios.put(`${API_URL}/${organization.id}`, mapToApiOrganization(organization));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const deleteOrganization = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
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
