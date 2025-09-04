import { FieldDefinitionInterface, ApiFieldDefinition } from "../types/fieldDefinition";

export const mapToApiFieldDefinition = (fieldDefinition: FieldDefinitionInterface) => ({
  id: fieldDefinition.id,
  name: fieldDefinition.fieldName,
  type: fieldDefinition.fieldType,
  order_index: fieldDefinition.orderIndex,
  reference_source_id: fieldDefinition.referenceSourceId,
  reference_source_name: fieldDefinition.referenceSourceName,
});

export const mapFromApiFieldDefinition = (
  fieldDefinition: ApiFieldDefinition
): FieldDefinitionInterface => ({
  id: fieldDefinition.id,
  fieldName: fieldDefinition.name,
  fieldType: (fieldDefinition.type as FieldDefinitionInterface["fieldType"]) || "text",
  orderIndex: fieldDefinition.order_index,
  referenceSourceId: fieldDefinition.reference_source_id,
  referenceSourceName: fieldDefinition.reference_source_name ?? "",
});
