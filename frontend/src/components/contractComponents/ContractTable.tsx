import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { ContractInterface } from "../../types/contract";
import { contractFormatted } from "../../utils/contractFormatted";

interface ContractTableProps {
  contracts: ContractInterface[];
  onEdit: (contract: ContractInterface) => void;
  onDelete: (id: number) => void;
}

const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  onEdit,
  onDelete,
}) => {
  const formattedContracts = contracts.map(contractFormatted);

  const columns = [
    {
      key: "contractNumber" as keyof ContractInterface,
      label: "Номер догвору",
    },
    { key: "contractDate" as keyof ContractInterface, label: "Дата договору" },
    { key: "contractAmount" as keyof ContractInterface, label: "Сума" },
    { key: "fullName" as keyof ContractInterface, label: "ПІБ" },
  ];

  return (
    <GeneralTable
      data={formattedContracts}
      columns={columns}
      renderActions={(contract) => (
        <Actions
          onEdit={() => onEdit(contract)}
          onDelete={() => onDelete(contract.id)}
        />
      )}
    />
  );
};

export default ContractTable;
