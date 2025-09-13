import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import OrderItemTable from "./OrderItemTable";
import OrderItemFormModal from "./OrderItemFormModal";
import { useOrderItems } from "../../hooks/useOrderItems";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { OrderItemInterface } from "../../types/orderItem";
import { orderItemFormatted } from "../../utils/orderItemFormatted";
import List from "../List";

const ITEMS_PER_PAGE = 10;

const OrderItemList = () => {
  const {
    data: orderItems = [],
    isLoading,
    error,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
  } = useOrderItems();


  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrderItem, setEditingOrderItem] =
    useState<OrderItemInterface | null>(null);
  const [copyingOrderItem, setCopyingOrderItem] =
    useState(false);

  const { searchParams, setUrlSearchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof OrderItemInterface) ||
    "orderNumber";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleAdd = () => {
    setEditingOrderItem(null);
    setCopyingOrderItem(false);
    setModalOpen(true);
  };

  const handleEdit = (orderItem: OrderItemInterface) => {
    setEditingOrderItem(
      orderItemFormatted(orderItem)
    );
    setCopyingOrderItem(false);
    setModalOpen(true);
  };

  const handleCopy = (orderItem: OrderItemInterface) => {
    setEditingOrderItem(
      orderItemFormatted(orderItem)
    );
    setCopyingOrderItem(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteOrderItem.mutate(id);
  };

  const handleSubmit = (orderItem: OrderItemInterface) => {
    if (orderItem.id && !copyingOrderItem) {
      updateOrderItem.mutate(orderItem);
    } else {
      createOrderItem.mutate(orderItem);
    }
    setModalOpen(false);
    setEditingOrderItem(null);
    setCopyingOrderItem(false);
  };

  const handlePageChange = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

    const filtered = orderItems.filter(
    (e: OrderItemInterface) =>
      e.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeFullName?.toLowerCase().includes(search.toLowerCase()) ||
      e.fieldDefinitionName?.toLowerCase().includes(search.toLowerCase()) ||
      e.value?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (sort === "id") {
      return Number(aValue) - Number(bValue);
    }

    return String(aValue).localeCompare(String(bValue));
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = sorted.slice(startIndex, endIndex);

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
      label="елемент наказу"
      onAdd={handleAdd}
      searchKey="search"
      sortOptions={[
        { value: "orderNumber", label: "За номером наказу" },
        { value: "orderDate", label: "За датою наказу" },
        { value: "employeeFullName", label: "За співробітником" },
        { value: "fieldDefinitionName", label: "За полем" },
        { value: "value", label: "За значенням" },
        { value: "id", label: "За замовчуванням" },
      ]}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    >
      <OrderItemTable
        orderItems={paginatedData}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <OrderItemFormModal
        open={modalOpen}
        title={
          editingOrderItem && !copyingOrderItem
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingOrderItem}
      />
    </List>
  );
};

export default OrderItemList;
