import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import Search from "../Search";
import Sort from "../Sort";
import AddEmployeeButton from "./AddEmployeeButton";
import EmployeeFormModal from "./EmployeeFormModal";
import { useEmployees } from "../../hooks/useEmployees";
import { EmployeeInterface } from "../../types/employee";
import { Container } from "@mui/material";

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

  const handleAdd = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEdit = (employee: EmployeeInterface) => {
    console.log(employee);
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEmployee.mutate(id);
  };

  const handleSubmit = (employee: EmployeeInterface) => {
    if (employee.id) {
      updateEmployee.mutate(employee);
    } else {
      createEmployee.mutate(employee);
    }
    setModalOpen(false);
  };

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
    <Container maxWidth="md">
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      <Sort
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        options={[
          { value: "fullName", label: "За ПІБ" },
          { value: "personnelNumber", label: "За табельним номером" },
        ]}
      />
      <EmployeeTable
        employees={sortedEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddEmployeeButton onClick={handleAdd} />
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
