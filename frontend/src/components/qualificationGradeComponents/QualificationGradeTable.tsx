import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { QualificationGradeInterface } from "../../types/qualificationGrade";

interface qualificationGradeTableProps {
  qualificationGrades: QualificationGradeInterface[];
  onEdit: (qualificationGrade: QualificationGradeInterface) => void;
  onCopy: (qualificationGrade: QualificationGradeInterface) => void;
  onDelete: (id: number) => void;
}

const qualificationGradeTable: React.FC<qualificationGradeTableProps> = ({
  qualificationGrades,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "grade" as keyof QualificationGradeInterface, label: "Назва" },

  ];

  return (
    <GeneralTable
      data={qualificationGrades}
      columns={columns}
      renderActions={(qualificationGrade) => (
        <Actions
          onEdit={() => onEdit(qualificationGrade)}
          onCopy={() => onCopy(qualificationGrade)}
          onDelete={() => onDelete(qualificationGrade.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default qualificationGradeTable;
