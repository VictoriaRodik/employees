export interface FieldDefinitionInterface {
  id: number;
  fieldName: string;
  fieldType: string;
  orderIndex: number;
  referenceSourceId: number;
  referenceSourceName: string;
}

export interface ApiFieldDefinition {
  id: number;
  name: string;
  type: string;
  order_index: number;
  reference_source_id: number;
  reference_source_name: string;
}
