import { useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import Search from "../components/Search";
import Sort from "../components/Sort";
import AddEmployeeButton from "../components/AddEmployeeButton";
import EmployeeFormModal from "../components/EmployeeFormModal";
import {
  useEmployees,
  useAddEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from "../hooks/useEmployees";
import { EmployeeInterface } from "../types/employee";

const EmployeeList = () => {
  const { data: employees = [], isLoading, error } = useEmployees();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

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
      addEmployee.mutate(employee);
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
    <div>
      <AddEmployeeButton onClick={handleAdd} />
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
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EmployeeFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmployee}
      />
    </div>
  );
};

export default EmployeeList;
