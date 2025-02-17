import React from "react";
import GeneralTable from "../components/Table";
import Actions from "../components/Actions";

interface Employee {
  id: number;
  fullName: string;
  personnelNumber: string;
  taxNumber: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  const columns = [
    { key: "fullName" as keyof Employee, label: "ПІБ" },
    { key: "personnelNumber" as keyof Employee, label: "Табельний номер" },
    { key: "taxNumber" as keyof Employee, label: "ІПН" },
  ];

  return (
    <GeneralTable
      data={employees}
      columns={columns}
      renderActions={(employee) => <Actions onEdit={() => onEdit(employee)} onDelete={() => onDelete(employee)} />}
    />
  );
};

export default EmployeeTable;
