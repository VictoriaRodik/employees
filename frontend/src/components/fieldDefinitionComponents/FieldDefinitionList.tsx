import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import FieldDefinitionTable from "./FieldDefinitionTable";
import FieldDefinitionFormModal from "./FieldDefinitionFormModal";
import { useFieldDefinitions } from "../../hooks/useFieldDefinitions";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { FieldDefinitionInterface } from "../../types/fieldDefinition";
import { fieldDefinitionFormatted } from "../../utils/fieldDefinitionFormatted";
import List from "../List";

const FieldDefinitionList = () => {
  const {
    data: fieldDefinitions = [],
    isLoading,
    error,
    createFieldDefinition,
    updateFieldDefinition,
    deleteFieldDefinition,
  } = useFieldDefinitions();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFieldDefinition, setEditingFieldDefinition] =
    useState<FieldDefinitionInterface | null>(null);
  const [copyingFieldDefinition, setCopyingFieldDefinition] =
    useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof FieldDefinitionInterface) ||
    "fieldDefinitionName";

  const handleAdd = () => {
    setEditingFieldDefinition(null);
    setCopyingFieldDefinition(false);
    setModalOpen(true);
  };

  const handleEdit = (fieldDefinition: FieldDefinitionInterface) => {
    setEditingFieldDefinition(
      fieldDefinitionFormatted(fieldDefinition)
    );
    setCopyingFieldDefinition(false);
    setModalOpen(true);
  };

  const handleCopy = (fieldDefinition: FieldDefinitionInterface) => {
    setEditingFieldDefinition(
      fieldDefinitionFormatted(fieldDefinition)
    );
    setCopyingFieldDefinition(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteFieldDefinition.mutate(id);
  };

  const handleSubmit = (fieldDefinition: FieldDefinitionInterface) => {
    if (fieldDefinition.id && !copyingFieldDefinition) {
      updateFieldDefinition.mutate(fieldDefinition);
    } else {
      createFieldDefinition.mutate(fieldDefinition);
    }
    setModalOpen(false);
    setEditingFieldDefinition(null);
    setCopyingFieldDefinition(false);
  };

  const filtered = fieldDefinitions.filter(
    (e: { fieldName: string }) =>
      e.fieldName?.toLowerCase().includes(search.toLowerCase())
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
      label="тип полів"
      onAdd={handleAdd}
      searchKey="fieldDefinitionName"
      sortOptions={[
        { value: "id", label: "За замовчуванням" },
        { value: "fieldDefinitionName", label: "За назвою" },
      ]}
    >
      <FieldDefinitionTable
        fieldDefinitions={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <FieldDefinitionFormModal
        open={modalOpen}
        title={
          editingFieldDefinition && !copyingFieldDefinition
            ? `Редагування`
            : copyingFieldDefinition
            ? "Копіювання"
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingFieldDefinition || copyingFieldDefinition ? editingFieldDefinition : null}
      />
    </List>
  );
};

export default FieldDefinitionList;
