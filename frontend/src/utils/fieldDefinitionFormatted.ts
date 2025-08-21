import { FieldDefinitionInterface } from "../types/fieldDefinition";

export const fieldDefinitionFormatted = (
    fieldDefinition?: Partial<FieldDefinitionInterface>
  ): FieldDefinitionInterface => ({
    id: fieldDefinition?.id ?? 0,
  fieldName: fieldDefinition?.fieldName ?? "",
  fieldType: fieldDefinition?.fieldType ?? "",
  orderIndex: fieldDefinition?.orderIndex ?? 0,
  referenceSourceId: fieldDefinition?.referenceSourceId ?? 0,
  referenceSourceName: fieldDefinition?.referenceSourceName ?? "",
});
