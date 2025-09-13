import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import PositionTable from "./PositionTable";
import PositionFormModal from "./PositionFormModal";
import { usePositions } from "../../hooks/usePositions";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { PositionInterface } from "../../types/position";
import { positionFormatted } from "../../utils/positionFormatted";
import List from "../List";

const ITEMS_PER_PAGE = 10;

const PositionList = () => {
  const {
    data: positions = [],
    isLoading,
    error,
    createPosition,
    updatePosition,
    deletePosition,
  } = usePositions();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<PositionInterface | null>(null);
  const [copyingPosition, setCopyingPosition] = useState(false);

  const { searchParams, setUrlSearchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as keyof PositionInterface) || "fullName";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleAdd = () => {
    setEditingPosition(null);
    setCopyingPosition(false);
    setModalOpen(true);
  };

  const handleEdit = (position: PositionInterface) => {
    setEditingPosition(positionFormatted(position));
    setCopyingPosition(false);
    setModalOpen(true);
  };

  const handleCopy = (position: PositionInterface) => {
    setEditingPosition(positionFormatted(position));
    setCopyingPosition(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePosition.mutate(id);
  };

  const handleSubmit = (position: PositionInterface) => {
    if (position.id && !copyingPosition) {
      updatePosition.mutate(position);
    } else {
      createPosition.mutate(position);
    }
    setModalOpen(false);
    setEditingPosition(null);
    setCopyingPosition(false);
  };

  const handlePageChange = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

  const filtered = positions.filter((e: { positionName: string; }) =>
    e.positionName?.toLowerCase().includes(search.toLowerCase())
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
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}
      >
        <CircularProgress />
      </Container>
    );

  if (error) return <p>Помилка при завантаженні</p>;

  return (
    <List
      label="посаду"
      onAdd={handleAdd}
      searchKey="positionName"
      sortOptions={[
        { value: "positionName", label: "За назвою" },
        { value: "id", label: "За замовчуванням" },
      ]}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    >
      <PositionTable
        positions={paginatedData}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <PositionFormModal
        open={modalOpen}
        title={editingPosition && !copyingPosition ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingPosition}
      />
    </List>
  );
};

export default PositionList;
