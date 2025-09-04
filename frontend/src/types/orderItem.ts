export interface OrderItemInterface {
  id: number;
  orderId: number;
  employeeId: number;
  fieldId: number;
  value: string;
  valueId: number;
  orderNumber: string;
  orderDate: string;
  employeeFullName: string;
  fieldDefinitionName: string;
}
export interface ApiOrderItem {
  id: number;
  order_id: number;
  employee_id: number;
  field_id: number;
  value: string;
  value_id: number;
  order_number: string;
  order_date: string;
  employee_full_name: string;
  field_definition_name: string;
}
