import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import Search from "../Search";
import Sort from "../Sort";
import Button from "../Button";
import EmployeeFormModal from "./EmployeeFormModal";
import { useEmployees } from "../../hooks/useEmployees";
import { EmployeeInterface } from "../../types/employee";
import { Container } from "@mui/material";
import { employeeFormatted } from "../../utils/employeeFormatted";

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
    setEditingEmployee(employeeFormatted(employee));
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEmployee.mutate(id);
  };

  const handleSubmit = async (employee: EmployeeInterface) => {
    if (employee.id) {
      await updateEmployee.mutate(employee);
    } else {
      await createEmployee.mutate(employee);
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
<Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', justifyContent: 'center', gap:'2rem'}}>
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
      <Button onClick={handleAdd}>Додати співробітника</Button>
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
