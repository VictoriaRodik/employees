import React, { useState } from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { ContractInterface } from "../../types/contract";
import { contractFormatted } from "../../utils/contractFormatted";
import ContractPDFPreview from "../pdf/ContractPDFPreview";
import { Button } from "@mui/material";

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
  const [previewContract, setPreviewContract] =
    useState<ContractInterface | null>(null);

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
    <>
      <GeneralTable
        data={formattedContracts}
        columns={columns}
        renderActions={(contract) => (
          <>
            <Actions
              onEdit={() => onEdit(contract)}
              onDelete={() => onDelete(contract.id)}
            />
            <Button onClick={() => setPreviewContract(contract)}>PDF</Button>
          </>
        )}
      />

      {/* Preview Modal */}
      {previewContract && (
        <ContractPDFPreview
          contract={previewContract}
          open={Boolean(previewContract)}
          onClose={() => setPreviewContract(null)}
        />
      )}
    </>
  );
};

export default ContractTable;
