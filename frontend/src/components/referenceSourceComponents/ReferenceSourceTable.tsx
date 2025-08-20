import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { ReferenceSourceInterface } from "../../types/referenceSource";

interface referenceSourceTableProps {
  referenceSources: ReferenceSourceInterface[];
  onEdit: (referenceSource: ReferenceSourceInterface) => void;
  onCopy: (referenceSource: ReferenceSourceInterface) => void;
  onDelete: (id: number) => void;
}

const referenceSourceTable: React.FC<referenceSourceTableProps> = ({
  referenceSources,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "tableName" as keyof ReferenceSourceInterface, label: "Назва" },

  ];

  return (
    <GeneralTable
      data={referenceSources}
      columns={columns}
      renderActions={(referenceSource) => (
        <Actions
          onEdit={() => onEdit(referenceSource)}
          onCopy={() => onCopy(referenceSource)}
          onDelete={() => onDelete(referenceSource.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default referenceSourceTable;
