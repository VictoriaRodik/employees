export interface FieldDefinitionInterface {
  id: number;
  fieldName: string;
  fieldType: 'text' | 'number' | 'date' | 'reference';
  orderIndex: number;
  referenceSourceId: number | null;
  referenceSourceName: string | null;
}

export interface ApiFieldDefinition {
  id: number;
  name: string;
  type: string;
  order_index: number;
  reference_source_id: number | null;
  reference_source_name: string | null;
}
