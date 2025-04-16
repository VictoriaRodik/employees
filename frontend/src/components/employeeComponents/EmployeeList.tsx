import { useState, useCallback } from "react";
import EmployeeTable from "./EmployeeTable";
import Search from "../Search";
import Sort from "../Sort";
import Button from "../Button";
import EmployeeFormModal from "./EmployeeFormModal";
import { useEmployees } from "../../hooks/useEmployees";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { EmployeeInterface } from "../../types/employee";
import { Container, CircularProgress } from "@mui/material";
import { employeeFormatted } from "../../utils/employeeFormatted";
import { SelectChangeEvent } from "@mui/material";

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
  const [editingEmployee, setEditingEmployee] =
    useState<EmployeeInterface | null>(null);
  const [copyingEmployee, setCopyingEmployee] = useState(false);
  const { searchParams, setUrlSearchParams } = useUrlSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "fullName";

  const handleAdd = useCallback(() => {
    setEditingEmployee(null);
    setCopyingEmployee(false);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((employee: EmployeeInterface) => {
    setEditingEmployee(employeeFormatted(employee));
    setModalOpen(true);
  }, []);

  const handleCopy = useCallback((employee: EmployeeInterface) => {
    setEditingEmployee(employeeFormatted(employee));
    setCopyingEmployee(true);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      deleteEmployee.mutate(id);
    },
    [deleteEmployee]
  );

  const handleSubmit = useCallback(
    (employee: EmployeeInterface) => {
      if (employee.id && !copyingEmployee) {
        updateEmployee.mutate(employee);
      } else {
        createEmployee.mutate(employee);
      }
      setModalOpen(false);
      setEditingEmployee(null);
      setCopyingEmployee(false);
    },
    [createEmployee, updateEmployee, copyingEmployee]
  );

  const handleSearch = useCallback(
    (e: SelectChangeEvent<string>) => {
      setUrlSearchParams({ search: e.target.value });
    },
    [setUrlSearchParams]
  );

  const handleSort = useCallback(
    (e: SelectChangeEvent<string>) => {
      setUrlSearchParams({ sort: e.target.value });
    },
    [setUrlSearchParams]
  );

  const filteredEmployees = employees.filter((e: EmployeeInterface) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const key = sort as keyof EmployeeInterface;
    const aValue = a[key];
    const bValue = b[key];

    if (key === "personnelNumber") {
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
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Search value={search} onChange={handleSearch} />
      <Sort
        value={sort}
        onChange={handleSort}
        options={[
          { value: "fullName", label: "За ПІБ" },
          { value: "personnelNumber", label: "За табельним номером" },
        ]}
      />
      <Button onClick={handleAdd}>Додати співробітника</Button>
      <EmployeeTable
        employees={sortedEmployees}
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
    </Container>
  );
};

export default EmployeeList;
