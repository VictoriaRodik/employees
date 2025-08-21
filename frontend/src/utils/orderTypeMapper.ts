import { OrderTypeInterface, ApiOrderType } from "../types/orderType";

export const mapToApiOrderType = (orderType: OrderTypeInterface) => ({
  id: orderType.id,
  name: orderType.orderTypeName,
});

export const mapFromApiOrderType = (
  orderType: ApiOrderType
): OrderTypeInterface => ({
  id: orderType.id,
  orderTypeName: orderType.name,
});
