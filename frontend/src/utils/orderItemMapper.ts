import { OrderItemInterface, ApiOrderItem } from "../types/orderItem";

export const mapToApiOrderItem = (orderItem: OrderItemInterface) => ({
  id: orderItem.id,
  order_id: orderItem.orderId,
  employee_id: orderItem.employeeId,
  field_id: orderItem.fieldId,
  value: orderItem.value,
  value_id: orderItem.valueId,
  order_number: orderItem.orderNumber,
  order_date: orderItem.orderDate,
  employee_full_name: orderItem.employeeFullName,
  field_definition_name: orderItem.fieldDefinitionName,
});

export const mapFromApiOrderItem = (
  orderItem: ApiOrderItem
): OrderItemInterface => ({
  id: orderItem.id,
  orderId: orderItem.order_id,
  employeeId: orderItem.employee_id,
  fieldId: orderItem.field_id,
  value: orderItem.value,
  valueId: orderItem.value_id,
  orderNumber: orderItem.order_number,
  orderDate: orderItem.order_date,
  employeeFullName: orderItem.employee_full_name,
  fieldDefinitionName: orderItem.field_definition_name,
});
