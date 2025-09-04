export interface OrderInterface {
  id: number;
  orderNumber: string;
  orderDate: string;
  orderTypeId: number;
  orderTypeName: string;
}

export interface ApiOrder {
  id: number;
  order_number: string;
  order_date: string;
  order_type_id: number;
  order_type_name: string;
}