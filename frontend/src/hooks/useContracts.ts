import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ContractInterface } from "../types/contract";
import { mapFromApiContract, mapToApiContract } from "../utils/contractMapper";

const API_URL = import.meta.env.VITE_API_URL + "/contracts";

export const useContracts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.map(mapFromApiContract);
    },
  });

  const createContract = useMutation({
    mutationFn: async (contract: ContractInterface) => {
      await axios.post(API_URL, mapToApiContract(contract));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  const updateContract = useMutation({
    mutationFn: async (contract: ContractInterface) => {
      await axios.put(`${API_URL}/${contract.id}`, mapToApiContract(contract));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  const deleteContract = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
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
