import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import EmployeeTable from "./EmployeeTable";
import EmployeeFormModal from "./EmployeeFormModal";
import { useEmployees } from "../../hooks/useEmployees";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { EmployeeInterface } from "../../types/employee";
import { employeeFormatted } from "../../utils/employeeFormatted";
import List from "../List";

const EmployeeList = () => {
  const {
    data: employees = [],
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeInterface | null>(null);
  const [copyingEmployee, setCopyingEmployee] = useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as keyof EmployeeInterface) || "fullName";

  const handleAdd = () => {
    setEditingEmployee(null);
    setCopyingEmployee(false);
    setModalOpen(true);
  };

  const handleEdit = (employee: EmployeeInterface) => {
    setEditingEmployee(employeeFormatted(employee));
    setCopyingEmployee(false);
    setModalOpen(true);
  };

  const handleCopy = (employee: EmployeeInterface) => {
    setEditingEmployee(employeeFormatted(employee));
    setCopyingEmployee(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEmployee.mutate(id);
  };

  const handleSubmit = (employee: EmployeeInterface) => {
    if (employee.id && !copyingEmployee) {
      updateEmployee.mutate(employee);
    } else {
      createEmployee.mutate(employee);
    }
    setModalOpen(false);
    setEditingEmployee(null);
    setCopyingEmployee(false);
  };

  const filtered = employees.filter((e: { fullName: string; }) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (sort === "personnelNumber") {
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
      label="співробітника"
      onAdd={handleAdd}
      searchKey="fullName"
      sortOptions={[
        { value: "fullName", label: "За ПІБ" },
        { value: "personnelNumber", label: "За табельним номером" },
      ]}
    >
      <EmployeeTable
        employees={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <EmployeeFormModal
        open={modalOpen}
        title={editingEmployee && !copyingEmployee ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmployee}
      />
    </List>
  );
};

export default EmployeeList;
