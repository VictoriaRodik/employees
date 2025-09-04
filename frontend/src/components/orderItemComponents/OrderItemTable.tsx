import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { OrderItemInterface } from "../../types/orderItem";

interface orderItemTableProps {
  orderItems: OrderItemInterface[];
  onEdit: (orderItem: OrderItemInterface) => void;
  onCopy: (orderItem: OrderItemInterface) => void;
  onDelete: (id: number) => void;
}

const orderItemTable: React.FC<orderItemTableProps> = ({
  orderItems,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "orderNumber" as keyof OrderItemInterface, label: "Наказ" },
    {
      key: "employeeFullName" as keyof OrderItemInterface,
      label: "Співробітник",
    },
    { key: "fieldDefinitionName" as keyof OrderItemInterface, label: "Поле" },
    { key: "value" as keyof OrderItemInterface, label: "Значення" },
  ];

  return (
    <GeneralTable
      data={orderItems}
      columns={columns}
      renderActions={(orderItem) => (
        <Actions
          onEdit={() => onEdit(orderItem)}
          onCopy={() => onCopy(orderItem)}
          onDelete={() => onDelete(orderItem.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default orderItemTable;
