import { OrderTypeInterface } from "../types/orderType";

export const orderTypeFormatted = (
  orderType?: Partial<OrderTypeInterface>
): OrderTypeInterface => ({
  id: orderType?.id ?? 0,
  orderTypeName: orderType?.orderTypeName ?? "New OrderType",
});
