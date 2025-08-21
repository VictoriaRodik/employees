import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { FieldDefinitionInterface } from "../../types/fieldDefinition";

interface fieldDefinitionTableProps {
  fieldDefinitions: FieldDefinitionInterface[];
  onEdit: (fieldDefinition: FieldDefinitionInterface) => void;
  onCopy: (fieldDefinition: FieldDefinitionInterface) => void;
  onDelete: (id: number) => void;
}

const fieldDefinitionTable: React.FC<fieldDefinitionTableProps> = ({
  fieldDefinitions,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "fieldName" as keyof FieldDefinitionInterface, label: "Назва" },
    { key: "fieldType" as keyof FieldDefinitionInterface, label: "Тип" },
    { key: "orderIndex" as keyof FieldDefinitionInterface, label: "Індекс" },
  ];

  return (
    <GeneralTable
      data={fieldDefinitions}
      columns={columns}
      renderActions={(fieldDefinition) => (
        <Actions
          onEdit={() => onEdit(fieldDefinition)}
          onCopy={() => onCopy(fieldDefinition)}
          onDelete={() => onDelete(fieldDefinition.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default fieldDefinitionTable;
