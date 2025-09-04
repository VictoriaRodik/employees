import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import OrderTypeTable from "./OrderTypeTable";
import OrderTypeFormModal from "./OrderTypeFormModal";
import { useOrderTypes } from "../../hooks/useOrderTypes";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { OrderTypeInterface } from "../../types/orderType";
import { orderTypeFormatted } from "../../utils/orderTypeFormatted";
import List from "../List";

const OrderTypeList = () => {
  const {
    data: orderTypes = [],
    isLoading,
    error,
    createOrderType,
    updateOrderType,
    deleteOrderType,
  } = useOrderTypes();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrderType, setEditingOrderType] =
    useState<OrderTypeInterface | null>(null);
  const [copyingOrderType, setCopyingOrderType] =
    useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof OrderTypeInterface) ||
    "fullName";

  const handleAdd = () => {
    setEditingOrderType(null);
    setCopyingOrderType(false);
    setModalOpen(true);
  };

  const handleEdit = (orderType: OrderTypeInterface) => {
    setEditingOrderType(
      orderTypeFormatted(orderType)
    );
    setCopyingOrderType(false);
    setModalOpen(true);
  };

  const handleCopy = (orderType: OrderTypeInterface) => {
    setEditingOrderType(
      orderTypeFormatted(orderType)
    );
    setCopyingOrderType(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteOrderType.mutate(id);
  };

  const handleSubmit = (orderType: OrderTypeInterface) => {
    if (orderType.id && !copyingOrderType) {
      updateOrderType.mutate(orderType);
    } else {
      createOrderType.mutate(orderType);
    }
    setModalOpen(false);
    setEditingOrderType(null);
    setCopyingOrderType(false);
  };

  const filtered = orderTypes.filter(
    (e: { orderTypeName: string }) =>
      e.orderTypeName?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (sort === "id") {
      return Number(aValue) - Number(bValue);
    }

    return String(aValue).localeCompare(String(bValue));
  });

  if (isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Container>
    );

  if (error) return <p>Помилка при завантаженні</p>;

  return (
    <List
      label="тип наказу"
      onAdd={handleAdd}
      searchKey="orderTypeName"
      sortOptions={[
        { value: "orderTypeName", label: "За назвою" },
        { value: "id", label: "За замовчуванням" },
      ]}
    >
      <OrderTypeTable
        orderTypes={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <OrderTypeFormModal
        open={modalOpen}
        title={
          editingOrderType && !copyingOrderType
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingOrderType}
      />
    </List>
  );
};

export default OrderTypeList;
