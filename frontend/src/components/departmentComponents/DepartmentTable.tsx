import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { DepartmentInterface } from "../../types/department";

interface DepartmentTableProps {
  departments: DepartmentInterface[];
  onEdit: (department: DepartmentInterface) => void;
  onCopy: (department: DepartmentInterface) => void;
  onDelete: (id: number) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
  departments,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "departmentName" as keyof DepartmentInterface, label: "Назва" },
  ];

  return (
    <GeneralTable
      data={departments}
      columns={columns}
      renderActions={(department) => (
        <Actions
          onEdit={() => onEdit(department)}
          onCopy={() => onCopy(department)}
          onDelete={() => onDelete(department.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default DepartmentTable;
