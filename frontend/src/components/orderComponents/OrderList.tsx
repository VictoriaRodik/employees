import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import OrderTable from "./OrderTable";
import OrderFormModal from "./OrderFormModal";
import ExportOrdersButton from "./ExportOrdersButton";
import { useOrders } from "../../hooks/useOrders";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { OrderInterface } from "../../types/order";
import { orderFormatted } from "../../utils/orderFormatted";
import List from "../List";

const ITEMS_PER_PAGE = 10;

const OrderList = () => {
  const {
    data: orders = [],
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  } = useOrders();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderInterface | null>(null);
  const [copyingOrder, setCopyingOrder] = useState(false);

  const { searchParams, setUrlSearchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as keyof OrderInterface) || "orderNumber";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const handleAdd = () => {
    setEditingOrder(null);
    setCopyingOrder(false);
    setModalOpen(true);
  };

  const handleEdit = (order: OrderInterface) => {
    setEditingOrder(orderFormatted(order));
    setCopyingOrder(false);
    setModalOpen(true);
  };

  const handleCopy = (order: OrderInterface) => {
    setEditingOrder(orderFormatted(order));
    setCopyingOrder(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteOrder.mutate(id);
  };

  const handleSubmit = (order: OrderInterface) => {
    if (order.id && !copyingOrder) {
      updateOrder.mutate(order);
    } else {
      createOrder.mutate(order);
    }
    setModalOpen(false);
    setEditingOrder(null);
    setCopyingOrder(false);
  };

  const handlePageChange = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

  const handleStartDateChange = (date: string | null) => {
    setUrlSearchParams({ startDate: date });
  };

  const handleEndDateChange = (date: string | null) => {
    setUrlSearchParams({ endDate: date });
  };

  const filtered = orders.filter((e: OrderInterface) => {

    const matchesSearch = e.orderNumber
      ?.toLowerCase()
      .includes(search.toLowerCase());

    let matchesDateRange = true;
    if (startDate || endDate) {
      const orderDate = new Date(e.orderDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && orderDate < start) {
        matchesDateRange = false;
      }
      if (end && orderDate > end) {
        matchesDateRange = false;
      }
    }

    return matchesSearch && matchesDateRange;
  });

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

  const exportButton = (
    <ExportOrdersButton
      orders={sorted}
      filters={{
        search,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sort,
      }}
    />
  );

  return (
    <List
      label="наказ"
      onAdd={handleAdd}
      searchKey="orderNumber"
      sortOptions={[
        { value: "id", label: "За замовчуванням" },
        { value: "orderNumber", label: "За номером" },
        { value: "orderDate", label: "За датою" },
        { value: "orderTypeName", label: "За типом" },
      ]}
      dateRange={{
        startDate,
        endDate,
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange,
        label: "Фільтр по даті наказу",
      }}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
      extraToolbar={exportButton}
    >
      <OrderTable
        orders={paginatedData}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <OrderFormModal
        open={modalOpen}
        title={editingOrder && !copyingOrder ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingOrder}
      />
    </List>
  );
};

export default OrderList;
