import { useState, useCallback } from "react";
import EmployeeTable from "./EmployeeTable";
import Search from "../Search";
import Sort from "../Sort";
import Button from "../Button";
import EmployeeFormModal from "./EmployeeFormModal";
import { useEmployees } from "../../hooks/useEmployees";
import { EmployeeInterface } from "../../types/employee";
import { Container } from "@mui/material";
import { employeeFormatted } from "../../utils/employeeFormatted";
import { SelectChangeEvent } from '@mui/material';

const EmployeeList = () => {
  const {
    data: employees = [],
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("fullName");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState<EmployeeInterface | null>(null);

  const handleAdd = useCallback(() => {
    setEditingEmployee(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((employee: EmployeeInterface) => {
    setEditingEmployee(employeeFormatted(employee));
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    deleteEmployee.mutate(id);
  }, [deleteEmployee]);

  const handleSubmit = useCallback(async (employee: EmployeeInterface) => {
    if (employee.id) {
      await updateEmployee.mutate(employee);
    } else {
      await createEmployee.mutate(employee);
    }
    setModalOpen(false);
  }, [createEmployee, updateEmployee]);

  const handleSearch = useCallback((e: SelectChangeEvent<string>) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = useCallback((e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
  }, []);

  const filteredEmployees = employees.filter((e: EmployeeInterface) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const key = sort as keyof EmployeeInterface;
    return String(a[key]).localeCompare(String(b[key]));
  });

  if (isLoading) return <p>Завантаження...</p>;
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
        onDelete={handleDelete}
      />

      <EmployeeFormModal
        open={modalOpen}
        title={editingEmployee ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmployee || undefined}
      />
    </Container>
  );
};

export default EmployeeList;
