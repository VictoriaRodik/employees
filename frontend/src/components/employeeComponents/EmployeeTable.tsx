import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { EmployeeInterface } from "../../types/employee";

interface EmployeeTableProps {
  employees: EmployeeInterface[];
  onEdit: (employee: EmployeeInterface) => void;
  onCopy: (employee: EmployeeInterface) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "fullName" as keyof EmployeeInterface, label: "ПІБ" },
    {
      key: "personnelNumber" as keyof EmployeeInterface,
      label: "Табельний номер",
    },
    { key: "taxId" as keyof EmployeeInterface, label: "ІПН" },
  ];

  return (
    <GeneralTable
      data={employees}
      columns={columns}
      renderActions={(employee) => (
        <Actions
          onEdit={() => onEdit(employee)}
          onCopy={() => onCopy(employee)}
          onDelete={() => onDelete(employee.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default EmployeeTable;
