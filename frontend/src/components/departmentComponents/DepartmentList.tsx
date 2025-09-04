import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import DepartmentTable from "./DepartmentTable";
import DepartmentFormModal from "./DepartmentFormModal";
import { useDepartments } from "../../hooks/useDepartments";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { DepartmentInterface } from "../../types/department";
import { departmentFormatted } from "../../utils/departmentFormatted";
import List from "../List";

const DepartmentList = () => {
  const {
    data: departments = [],
    isLoading,
    error,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartments();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentInterface | null>(null);
  const [copyingDepartment, setCopyingDepartment] = useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as keyof DepartmentInterface) || "fullName";

  const handleAdd = () => {
    setEditingDepartment(null);
    setCopyingDepartment(false);
    setModalOpen(true);
  };

  const handleEdit = (department: DepartmentInterface) => {
    setEditingDepartment(departmentFormatted(department));
    setCopyingDepartment(false);
    setModalOpen(true);
  };

  const handleCopy = (department: DepartmentInterface) => {
    setEditingDepartment(departmentFormatted(department));
    setCopyingDepartment(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteDepartment.mutate(id);
  };

  const handleSubmit = (department: DepartmentInterface) => {
    if (department.id && !copyingDepartment) {
      updateDepartment.mutate(department);
    } else {
      createDepartment.mutate(department);
    }
    setModalOpen(false);
    setEditingDepartment(null);
    setCopyingDepartment(false);
  };

  const filtered = departments.filter((e: { departmentName: string; }) =>
    e.departmentName?.toLowerCase().includes(search.toLowerCase())
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
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}
      >
        <CircularProgress />
      </Container>
    );

  if (error) return <p>Помилка при завантаженні</p>;

  return (
    <List
      label="підрозділ"
      onAdd={handleAdd}
      searchKey="departmentName"
      sortOptions={[
        { value: "departmentName", label: "За назвою" },
        { value: "id", label: "За замовчуванням" },
      ]}
    >
      <DepartmentTable
        departments={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <DepartmentFormModal
        open={modalOpen}
        title={editingDepartment && !copyingDepartment ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingDepartment}
      />
    </List>
  );
};

export default DepartmentList;
