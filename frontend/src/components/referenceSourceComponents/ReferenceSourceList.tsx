import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import ReferenceSourceTable from "./ReferenceSourceTable";
import ReferenceSourceFormModal from "./ReferenceSourceFormModal";
import { useReferenceSources } from "../../hooks/useReferenceSources";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { ReferenceSourceInterface } from "../../types/referenceSource";
import { referenceSourceFormatted } from "../../utils/referenceSourceFormatted";
import List from "../List";

const ReferenceSourceList = () => {
  const {
    data: referenceSources = [],
    isLoading,
    error,
    createReferenceSource,
    updateReferenceSource,
    deleteReferenceSource,
  } = useReferenceSources();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingReferenceSource, setEditingReferenceSource] =
    useState<ReferenceSourceInterface | null>(null);
  const [copyingReferenceSource, setCopyingReferenceSource] = useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof ReferenceSourceInterface) || "tableName";

  const handleAdd = () => {
    setEditingReferenceSource(null);
    setCopyingReferenceSource(false);
    setModalOpen(true);
  };

  const handleEdit = (referenceSource: ReferenceSourceInterface) => {
    setEditingReferenceSource(referenceSourceFormatted(referenceSource));
    setCopyingReferenceSource(false);
    setModalOpen(true);
  };

  const handleCopy = (referenceSource: ReferenceSourceInterface) => {
    setEditingReferenceSource(referenceSourceFormatted(referenceSource));
    setCopyingReferenceSource(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteReferenceSource.mutate(id);
  };

  const handleSubmit = (referenceSource: ReferenceSourceInterface) => {
    if (referenceSource.id && !copyingReferenceSource) {
      updateReferenceSource.mutate(referenceSource);
    } else {
      createReferenceSource.mutate(referenceSource);
    }

    setModalOpen(false);
    setEditingReferenceSource(null);
    setCopyingReferenceSource(false);
  };

  const filtered = referenceSources.filter((e: { tableName: string }) =>
    e.tableName?.toString().includes(search)
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
      label="посилання на таблицю"
      onAdd={handleAdd}
      searchKey="tableName"
      sortOptions={[
        { value: "id", label: "За замовчуванням" },
        { value: "tableName", label: "За назвою" },
      ]}
    >
      <ReferenceSourceTable
        referenceSources={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <ReferenceSourceFormModal
        open={modalOpen}
        title={
          editingReferenceSource && !copyingReferenceSource
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingReferenceSource}
      />
    </List>
  );
};

export default ReferenceSourceList;
