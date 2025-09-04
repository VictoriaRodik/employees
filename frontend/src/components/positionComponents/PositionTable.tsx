import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { PositionInterface } from "../../types/position";

interface PositionTableProps {
  positions: PositionInterface[];
  onEdit: (position: PositionInterface) => void;
  onCopy: (position: PositionInterface) => void;
  onDelete: (id: number) => void;
}

const PositionTable: React.FC<PositionTableProps> = ({
  positions,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "positionName" as keyof PositionInterface, label: "Назва" },
  ];

  return (
    <GeneralTable
      data={positions}
      columns={columns}
      renderActions={(position) => (
        <Actions
          onEdit={() => onEdit(position)}
          onCopy={() => onCopy(position)}
          onDelete={() => onDelete(position.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default PositionTable;
