import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { GradeSalaryInterface } from "../../types/gradeSalary";

interface gradeSalaryTableProps {
  gradeSalaries: GradeSalaryInterface[];
  onEdit: (gradeSalary: GradeSalaryInterface) => void;
  onCopy: (gradeSalary: GradeSalaryInterface) => void;
  onDelete: (id: number) => void;
}

const gradeSalaryTable: React.FC<gradeSalaryTableProps> = ({
  gradeSalaries,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "gradeId" as keyof GradeSalaryInterface, label: "Розряд" },
    { key: "baseSalary" as keyof GradeSalaryInterface, label: "Оклад" },
    { key: "effectiveFrom" as keyof GradeSalaryInterface, label: "Діє з" },
  ];

  return (
    <GeneralTable
      data={gradeSalaries}
      columns={columns}
      renderActions={(gradeSalary) => (
        <Actions
          onEdit={() => onEdit(gradeSalary)}
          onCopy={() => onCopy(gradeSalary)}
          onDelete={() => onDelete(gradeSalary.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default gradeSalaryTable;
