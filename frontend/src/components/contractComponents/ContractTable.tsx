import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import PrintActions from "../PrintActions";
import { ContractInterface } from "../../types/contract";
import { contractFormatted } from "../../utils/contractFormatted";

interface ContractTableProps {
  contracts: ContractInterface[];
  onEdit: (contract: ContractInterface) => void;
  onCopy: (contract: ContractInterface) => void;
  onPreviewContract: (contract: ContractInterface) => void;
  onPreviewCashOrder: (contract: ContractInterface) => void;
  onDelete: (id: number) => void;
}

const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  onEdit,
  onCopy,
  onDelete,
  onPreviewContract,
  onPreviewCashOrder,
}) => {
  const formattedContracts = contracts.map(contractFormatted);

  const columns = [
    {
      key: "contractNumber" as keyof ContractInterface,
      label: "Номер договору",
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
        <>
          <Actions
            onEdit={() => onEdit(contract)}
            onCopy={() => onCopy(contract)}
            onDelete={() => onDelete(contract.id)}
            editTitle="Edit"
            copyTitle="Copy"
            deleteTitle="Delete"
          />
          <PrintActions
            onPreviewContract={() => onPreviewContract(contract)}
            onPreviewCashOrder={() => onPreviewCashOrder(contract)}
            previewContractTitle="Preview Contract PDF"
            previewCashOrderTitle="Preview Cash Order PDF"
          />
        </>
      )}
    />
  );
};

export default ContractTable;
