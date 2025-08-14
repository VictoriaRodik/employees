import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import EmploymentTypeTable from "./EmploymentTypeTable";
import EmploymentTypeFormModal from "./EmploymentTypeFormModal";
import { useEmploymentTypes } from "../../hooks/useEmploymentTypes";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { EmploymentTypeInterface } from "../../types/employmentType";
import { employmentTypeFormatted } from "../../utils/employmentTypeFormatted";
import List from "../List";

const EmploymentTypeList = () => {
  const {
    data: employmentTypes = [],
    isLoading,
    error,
    createEmploymentType,
    updateEmploymentType,
    deleteEmploymentType,
  } = useEmploymentTypes();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmploymentType, setEditingEmploymentType] =
    useState<EmploymentTypeInterface | null>(null);
  const [copyingEmploymentType, setCopyingEmploymentType] =
    useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof EmploymentTypeInterface) ||
    "fullName";

  const handleAdd = () => {
    setEditingEmploymentType(null);
    setCopyingEmploymentType(false);
    setModalOpen(true);
  };

  const handleEdit = (employmentType: EmploymentTypeInterface) => {
    setEditingEmploymentType(
      employmentTypeFormatted(employmentType)
    );
    setCopyingEmploymentType(false);
    setModalOpen(true);
  };

  const handleCopy = (employmentType: EmploymentTypeInterface) => {
    setEditingEmploymentType(
      employmentTypeFormatted(employmentType)
    );
    setCopyingEmploymentType(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEmploymentType.mutate(id);
  };

  const handleSubmit = (employmentType: EmploymentTypeInterface) => {
    if (employmentType.id && !copyingEmploymentType) {
      updateEmploymentType.mutate(employmentType);
    } else {
      createEmploymentType.mutate(employmentType);
    }
    setModalOpen(false);
    setEditingEmploymentType(null);
    setCopyingEmploymentType(false);
  };

  const filtered = employmentTypes.filter(
    (e: { employmentTypeName: string }) =>
      e.employmentTypeName?.toLowerCase().includes(search.toLowerCase())
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
      label="підрозділ"
      onAdd={handleAdd}
      searchKey="employmentTypeName"
      sortOptions={[
        { value: "employmentTypeName", label: "За назвою" },
        { value: "id", label: "За замовчуванням" },
      ]}
    >
      <EmploymentTypeTable
        employmentTypes={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <EmploymentTypeFormModal
        open={modalOpen}
        title={
          editingEmploymentType && !copyingEmploymentType
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmploymentType}
      />
    </List>
  );
};

export default EmploymentTypeList;
