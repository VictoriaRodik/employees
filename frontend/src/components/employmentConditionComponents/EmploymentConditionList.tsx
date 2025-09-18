import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import EmploymentConditionTable from "./EmploymentConditionTable";
import EmploymentConditionFormModal from "./EmploymentConditionFormModal";
import { useEmploymentConditions } from "../../hooks/useEmploymentConditions";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { EmploymentConditionInterface } from "../../types/employmentCondition";
import { employmentConditionFormatted } from "../../utils/employmentConditionFormatted";
import List from "../List";

const EmploymentConditionList = () => {
  const {
    data: employmentConditions = [],
    isLoading,
    error,
    createEmploymentCondition,
    updateEmploymentCondition,
    deleteEmploymentCondition,
  } = useEmploymentConditions();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmploymentCondition, setEditingEmploymentCondition] =
    useState<EmploymentConditionInterface | null>(null);
  const [copyingEmploymentCondition, setCopyingEmploymentCondition] =
    useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof EmploymentConditionInterface) ||
    "employmentConditionName";

  const handleAdd = () => {
    setEditingEmploymentCondition(null);
    setCopyingEmploymentCondition(false);
    setModalOpen(true);
  };

  const handleEdit = (employmentCondition: EmploymentConditionInterface) => {
    setEditingEmploymentCondition(
      employmentConditionFormatted(employmentCondition)
    );
    setCopyingEmploymentCondition(false);
    setModalOpen(true);
  };

  const handleCopy = (employmentCondition: EmploymentConditionInterface) => {
    setEditingEmploymentCondition(
      employmentConditionFormatted(employmentCondition)
    );
    setCopyingEmploymentCondition(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEmploymentCondition.mutate(id);
  };

  const handleSubmit = (employmentCondition: EmploymentConditionInterface) => {
    if (employmentCondition.id && !copyingEmploymentCondition) {
      updateEmploymentCondition.mutate(employmentCondition);
    } else {
      createEmploymentCondition.mutate(employmentCondition);
    }
    setModalOpen(false);
    setEditingEmploymentCondition(null);
    setCopyingEmploymentCondition(false);
  };

  const filtered = employmentConditions.filter(
    (e: { employmentConditionName: string }) =>
      e.employmentConditionName?.toLowerCase().includes(search.toLowerCase())
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
      label="умову прийняття на роботу"
      onAdd={handleAdd}
      searchKey="employmentConditionName"
      sortOptions={[
        { value: "id", label: "За замовчуванням" },
        { value: "employmentConditionName", label: "За назвою" },
      ]}
    >
      <EmploymentConditionTable
        employmentConditions={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <EmploymentConditionFormModal
        open={modalOpen}
        title={
          editingEmploymentCondition && !copyingEmploymentCondition
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmploymentCondition}
      />
    </List>
  );
};

export default EmploymentConditionList;
