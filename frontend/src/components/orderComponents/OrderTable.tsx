import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { OrderInterface } from "../../types/order";
import { orderFormatted } from "../../utils/orderFormatted";
import { IconButton, Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

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

  const handleExport = async (order: OrderInterface) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/${order.id}/export.docx`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeName = (order.orderNumber || `order-${order.id}`).replace(
      /[^\p{L}\p{N}_\- ]/gu,
      "_"
    );
    a.href = url;
    a.download = `${safeName}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <GeneralTable
      data={orders.map(orderFormatted)}
      columns={columns}
      renderExtraActions={(order: OrderInterface) => (
        <Tooltip title="Експорт наказу в DOCX">
          <IconButton color="primary" onClick={() => handleExport(order)}>
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      )}
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
