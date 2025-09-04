import { fetchAll } from "./apiService";

export interface ReferenceItem {
  id: number;
  name?: string;
  [key: string]: unknown;
}

export const fetchReferenceItems = (referenceSourceId: number) => {
  return fetchAll<ReferenceItem>(`referenceSources/${referenceSourceId}/items`);
};
