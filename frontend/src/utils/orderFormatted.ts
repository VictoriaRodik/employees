import { OrderInterface } from "../types/order";

export const orderFormatted = (
  order?: Partial<OrderInterface>
): OrderInterface => ({
  id: order?.id ?? 0,
  orderNumber: order?.orderNumber ?? "",
  orderDate: order?.orderDate
    ? new Date(order.orderDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA"),
  orderTypeId: order?.orderTypeId ?? 0,
  orderTypeName: order?.orderTypeName ?? "",
});
