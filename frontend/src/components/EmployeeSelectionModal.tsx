import React, { useState, useMemo } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Modal from "./Modal";
import SelectableTable from "./SelectableTable";
import Search from "./Search";
import Actions from "./Actions";
import EmployeeFormModal from "./employeeComponents/EmployeeFormModal";
import { EmployeeInterface } from "../types/employee";
import { useEmployees } from "../hooks/useEmployees";
import { employeeFormatted } from "../utils/employeeFormatted";

interface EmployeeSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onEmployeeSelect: (employee: EmployeeInterface) => void;
}

const EmployeeSelectionModal: React.FC<EmployeeSelectionModalProps> = ({
  open,
  onClose,
  onEmployeeSelect,
}) => {
  const {
    data: employees = [],
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeInterface | null>(null);
  const [editingEmployee, setEditingEmployee] =
    useState<EmployeeInterface | null>(null);
  const [copyEmployee, setCopyEmployee] = useState(false);
  const [employeeFormOpen, setEmployeeFormOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;

    return employees.filter(
      (employee: EmployeeInterface) =>
        employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.personnelNumber?.toString().includes(searchTerm) ||
        employee.taxId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEmployeeSelect = (employee: EmployeeInterface) => {
    setSelectedEmployee(employee);
  };

  const handleConfirmSelection = () => {
    if (selectedEmployee) {
      onEmployeeSelect(selectedEmployee);
      setSelectedEmployee(null);
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    setSelectedEmployee(null);
    setCopyEmployee(false);
    setEditingEmployee(null);
    setSearchTerm("");
    onClose();
  };

  const handleEditEmployee = (employee: EmployeeInterface) => {
    setCopyEmployee(false);
    setEditingEmployee(employeeFormatted(employee));
    setEmployeeFormOpen(true);
  };

  const handleCopyEmployee = (employee: EmployeeInterface) => {
    setCopyEmployee(true);
    setEditingEmployee(employeeFormatted(employee));
    setEmployeeFormOpen(true);
  };

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee.mutate(id);
  };

  const handleEmployeeSubmit = (employee: EmployeeInterface) => {
    if (employee.id && editingEmployee?.id && !copyEmployee) {
      updateEmployee.mutate(employee);
    } else if (employee.id && copyEmployee) {
      createEmployee.mutate(employee);
    } else {
      createEmployee.mutate(employee);
    }
    setEmployeeFormOpen(false);
    setEditingEmployee(null);
    setCopyEmployee(false);
  };

  const handleEmployeeFormClose = () => {
    setEmployeeFormOpen(false);
    setEditingEmployee(null);
  };

  const columns = [
    {
      key: "personnelNumber" as keyof EmployeeInterface,
      label: "Табельний номер",
    },
    { key: "fullName" as keyof EmployeeInterface, label: "ПІБ" },
  ];

  const actions = (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button onClick={handleClose} color="secondary">
        Скасувати
      </Button>
      <Button
        onClick={handleConfirmSelection}
        variant="contained"
        disabled={!selectedEmployee}
      >
        Вибрати
      </Button>
    </Box>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Вибір співробітника"
      actions={actions}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Search
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Пошук ..."
        />

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2, textAlign: "center", color: "error.main" }}>
            Помилка при завантаженні
          </Box>
        ) : (
          <SelectableTable<EmployeeInterface>
            data={filteredEmployees}
            columns={columns}
            onRowSelect={handleEmployeeSelect}
            selectedItem={selectedEmployee}
            getRowId={(employee) => employee.id}
            renderActions={(employee) => (
              <Actions
                onEdit={() => handleEditEmployee(employee)}
                onCopy={() => handleCopyEmployee(employee)}
                onDelete={() => handleDeleteEmployee(employee.id)}
                editTitle="Редагувати"
                copyTitle="Копіювати"
                deleteTitle="Видалити"
              />
            )}
          />
        )}
      </Box>

      <EmployeeFormModal
        open={employeeFormOpen}
        onClose={handleEmployeeFormClose}
        onSubmit={handleEmployeeSubmit}
        title={
          editingEmployee?.id && !copyEmployee
            ? "Редагування"
            : copyEmployee
            ? "Копіювання"
            : "Введення"
        }
        initialValues={editingEmployee || copyEmployee ? editingEmployee : null}
      />
    </Modal>
  );
};

export default EmployeeSelectionModal;
