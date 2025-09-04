import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { OrderTypeInterface } from "../../types/orderType";

interface orderTypeTableProps {
  orderTypes: OrderTypeInterface[];
  onEdit: (orderType: OrderTypeInterface) => void;
  onCopy: (orderType: OrderTypeInterface) => void;
  onDelete: (id: number) => void;
}

const orderTypeTable: React.FC<orderTypeTableProps> = ({
  orderTypes,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "orderTypeName" as keyof OrderTypeInterface, label: "Назва" },
  ];

  return (
    <GeneralTable
      data={orderTypes}
      columns={columns}
      renderActions={(orderType) => (
        <Actions
          onEdit={() => onEdit(orderType)}
          onCopy={() => onCopy(orderType)}
          onDelete={() => onDelete(orderType.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default orderTypeTable;
