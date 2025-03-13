import { useState, useCallback } from "react";
import ContractTable from "./ContractTable";
import Search from "../Search";
import Sort from "../Sort";
import Button from "../Button";
import ContractFormModal from "./ContractFormModal";
import { useContracts } from "../../hooks/useContracts";
import { ContractInterface } from "../../types/contract";
import { Container, SelectChangeEvent, CircularProgress } from "@mui/material";
import { contractFormatted } from "../../utils/contractFormatted";
import ContractPDFPreview from "../pdf/ContractPDFPreview";
import CashOrderPDFPreview from "../pdf/CashOrderPDFPreview";

const ContractList = () => {
  const {
    data: contracts = [],
    isLoading,
    error,
    createContract,
    updateContract,
    deleteContract,
  } = useContracts();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("fullName");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] =
    useState<ContractInterface | null>(null);
  const [copyingContract, setCopyingContract] = useState(false);
  const [previewContract, setPreviewContract] =
    useState<ContractInterface | null>(null);
  const [previewCashOrder, setPreviewCashOrder] =
    useState<ContractInterface | null>(null);

  const handleAdd = useCallback(() => {
    setEditingContract(null);
    setCopyingContract(false);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((contract: ContractInterface) => {
    setEditingContract(contractFormatted(contract));
    setModalOpen(true);
  }, []);

  const handleCopy = useCallback((contract: ContractInterface) => {
    setEditingContract(contractFormatted(contract));
    setCopyingContract(true);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      deleteContract.mutate(id);
    },
    [deleteContract]
  );

  const handleSubmit = useCallback(
    (contract: ContractInterface) => {
      if (contract.id && !copyingContract) {
        updateContract.mutate(contract);
      } else {
        createContract.mutate(contract);
      }
      setModalOpen(false);
    },
    [createContract, updateContract, copyingContract]
  );

  const handleSearch = useCallback((e: SelectChangeEvent<string>) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = useCallback((e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
  }, []);

  const handlePreviewContract = useCallback((contract: ContractInterface) => {
    setPreviewContract(contract);
  }, []);

  const handlePreviewCashOrder = useCallback((contract: ContractInterface) => {
    setPreviewCashOrder(contract);
  }, []);

  const filteredContracts = contracts.filter((e: ContractInterface) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedContracts = [...filteredContracts].sort((a, b) => {
    const key = sort as keyof ContractInterface;
    return String(a[key]).localeCompare(String(b[key]));
  });

  if (isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  if (error) return <p>Помилка при завантаженні</p>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Search value={search} onChange={handleSearch} />
      <Sort
        value={sort}
        onChange={handleSort}
        options={[
          { value: "fullName", label: "За ПІБ" },
          { value: "contractDate", label: "За датою договору" },
        ]}
      />
      <Button onClick={handleAdd}>Додати договір</Button>
      <ContractTable
        contracts={sortedContracts}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onPreviewContract={handlePreviewContract}
        onPreviewCashOrder={handlePreviewCashOrder}
      />
      <ContractFormModal
        open={modalOpen}
        title={editingContract && !copyingContract ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingContract || undefined}
      />
      {previewContract && (
        <ContractPDFPreview
          contract={previewContract}
          open={Boolean(previewContract)}
          onClose={() => setPreviewContract(null)}
        />
      )}
      {previewCashOrder && (
        <CashOrderPDFPreview
          contract={previewCashOrder}
          open={Boolean(previewCashOrder)}
          onClose={() => setPreviewCashOrder(null)}
        />
      )}
    </Container>
  );
};

export default ContractList;
