import { ReferenceSourceInterface } from "../types/referenceSource";
export const referenceSourceFormatted = (
  referenceSource?: Partial<ReferenceSourceInterface>
): ReferenceSourceInterface => ({
  id: referenceSource?.id ?? 0,
  tableName: referenceSource?.tableName ?? "",
});
