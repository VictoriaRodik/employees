import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { OrganizationInterface } from "../../types/organization";

interface OrganizationTableProps {
  organizations: OrganizationInterface[];
  onEdit: (organization: OrganizationInterface) => void;
  onCopy: (organization: OrganizationInterface) => void;
  onDelete: (id: number) => void;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  organizations,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "name" as keyof OrganizationInterface, label: "Назва організації" },
    {
      key: "shortName" as keyof OrganizationInterface,
      label: "Скорочена назва",
    },
    {
      key: "edrpouCode" as keyof OrganizationInterface,
      label: "ЄДРПОУ",
    },
    {
      key: "directorFullName" as keyof OrganizationInterface,
      label: "Керівник",
    },
  ];

  return (
    <GeneralTable
      data={organizations}
      columns={columns}
      renderActions={(organization) => (
        <Actions
          onEdit={() => onEdit(organization)}
          onCopy={() => onCopy(organization)}
          onDelete={() => onDelete(organization.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default OrganizationTable;
