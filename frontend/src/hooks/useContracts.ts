import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContractInterface } from "../types/contract";
import { mapFromApiContract, mapToApiContract } from "../utils/contractMapper";
import { fetchContracts, addContract, editContract, removeContract } from "../api/contracts";

export const useContracts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      try {
        const result = await fetchContracts();
        return result.map(mapFromApiContract);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        throw error;
      }
    },
  });

  const createContract = useMutation({
    mutationFn: async (contract: ContractInterface) =>
      addContract(mapToApiContract(contract)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  const updateContract = useMutation({
    mutationFn: async (contract: ContractInterface) =>
      editContract(mapToApiContract(contract)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  const deleteContract = useMutation({
    mutationFn: async (id: number) => removeContract(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createContract,
    updateContract,
    deleteContract,
  };
};
