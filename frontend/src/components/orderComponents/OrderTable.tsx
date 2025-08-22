import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { OrderInterface } from "../../types/order";

interface orderTableProps {
  orders: OrderInterface[];
  onEdit: (order: OrderInterface) => void;
  onCopy: (order: OrderInterface) => void;
  onDelete: (id: number) => void;
}

const orderTable: React.FC<orderTableProps> = ({
  orders,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "orderNumber" as keyof OrderInterface, label: "Номер" },
    { key: "orderDate" as keyof OrderInterface, label: "Дата" },
    { key: "orderTypeName" as keyof OrderInterface, label: "Тип" },
  ];

  return (
    <GeneralTable
      data={orders}
      columns={columns}
      renderActions={(order) => (
        <Actions
          onEdit={() => onEdit(order)}
          onCopy={() => onCopy(order)}
          onDelete={() => onDelete(order.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default orderTable;
