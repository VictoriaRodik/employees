import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { EmploymentConditionInterface } from "../../types/employmentCondition";

interface employmentConditionTableProps {
  employmentConditions: EmploymentConditionInterface[];
  onEdit: (employmentCondition: EmploymentConditionInterface) => void;
  onCopy: (employmentCondition: EmploymentConditionInterface) => void;
  onDelete: (id: number) => void;
}

const employmentConditionTable: React.FC<employmentConditionTableProps> = ({
  employmentConditions,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "employmentConditionName" as keyof EmploymentConditionInterface, label: "Назва" },
  ];

  return (
    <GeneralTable
      data={employmentConditions}
      columns={columns}
      renderActions={(employmentCondition) => (
        <Actions
          onEdit={() => onEdit(employmentCondition)}
          onCopy={() => onCopy(employmentCondition)}
          onDelete={() => onDelete(employmentCondition.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default employmentConditionTable;
