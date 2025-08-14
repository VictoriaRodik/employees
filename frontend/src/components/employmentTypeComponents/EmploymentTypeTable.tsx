import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { EmploymentTypeInterface } from "../../types/employmentType";

interface employmentTypeTableProps {
  employmentTypes: EmploymentTypeInterface[];
  onEdit: (employmentType: EmploymentTypeInterface) => void;
  onCopy: (employmentType: EmploymentTypeInterface) => void;
  onDelete: (id: number) => void;
}

const employmentTypeTable: React.FC<employmentTypeTableProps> = ({
  employmentTypes,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "employmentTypeName" as keyof EmploymentTypeInterface, label: "Назва" },
  ];

  return (
    <GeneralTable
      data={employmentTypes}
      columns={columns}
      renderActions={(employmentType) => (
        <Actions
          onEdit={() => onEdit(employmentType)}
          onCopy={() => onCopy(employmentType)}
          onDelete={() => onDelete(employmentType.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default employmentTypeTable;
