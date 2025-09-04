import {
  ReferenceSourceInterface,
  ApiReferenceSource,
} from "../types/referenceSource";

export const mapToApiReferenceSource = (
  referenceSource: ReferenceSourceInterface
) => ({
  id: referenceSource.id,
  table_name: referenceSource.tableName,
});

export const mapFromApiReferenceSource = (
  referenceSource: ApiReferenceSource
): ReferenceSourceInterface => ({
  id: referenceSource.id,
  tableName: referenceSource.table_name,
});
