import { useQuery } from "@tanstack/react-query";
import { fetchReferenceItems } from "../api/referenceItems";

export const useReferenceItems = (referenceSourceId: number | null) => {
  const enabled = !!referenceSourceId && referenceSourceId > 0;
  
  return useQuery({
    queryKey: ["referenceItems", referenceSourceId],
    queryFn: () => fetchReferenceItems(referenceSourceId!),
    enabled,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
