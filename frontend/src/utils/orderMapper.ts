import { OrderInterface, ApiOrder } from "../types/order";

export const mapToApiOrder = (order: OrderInterface) => ({
  id: order.id,
  order_number: order.orderNumber,
  order_date: order.orderDate,
  order_type_id: order.orderTypeId,
  order_type_name: order.orderTypeName,
});

export const mapFromApiOrder = (order: ApiOrder): OrderInterface => ({
  id: order.id,
  orderNumber: order.order_number,
  orderDate: order.order_date,
  orderTypeId: order.order_type_id,
  orderTypeName: order.order_type_name,
});