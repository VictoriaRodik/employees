import { OrderItemInterface } from "../types/orderItem";

export const orderItemFormatted = (
  orderItem?: Partial<OrderItemInterface>
): OrderItemInterface => ({
  id: orderItem?.id ?? 0,
  orderId: orderItem?.orderId ?? 0,
  employeeId: orderItem?.employeeId ?? 0,
  fieldId: orderItem?.fieldId ?? 0,
  value: orderItem?.value ?? "",
  valueId: orderItem?.valueId ?? 0,
  orderNumber: orderItem?.orderNumber ?? "",
  orderDate: orderItem?.orderDate
    ? new Date(orderItem.orderDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA"),
  employeeFullName: orderItem?.employeeFullName ?? "",
  fieldDefinitionName: orderItem?.fieldDefinitionName ?? ""
});
