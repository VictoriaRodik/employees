import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import ContractTable from "./ContractTable";
import ContractFormModal from "./ContractFormModal";
import ContractPDFPreview from "../pdf/ContractPDFPreview";
import CashOrderPDFPreview from "../pdf/CashOrderPDFPreview";
import { useContracts } from "../../hooks/useContracts";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { ContractInterface } from "../../types/contract";
import { contractFormatted } from "../../utils/contractFormatted";
import List from "../List";

const ITEMS_PER_PAGE = 10;

const ContractList: React.FC = () => {
  const {
    data: contracts = [],
    isLoading,
    error,
    createContract,
    updateContract,
    deleteContract,
  } = useContracts();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] =
    useState<ContractInterface | null>(null);
  const [copyingContract, setCopyingContract] = useState(false);
  const [previewContract, setPreviewContract] =
    useState<ContractInterface | null>(null);
  const [previewCashOrder, setPreviewCashOrder] =
    useState<ContractInterface | null>(null);

  const { searchParams, setUrlSearchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof ContractInterface) || "contractDate";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const handleAdd = () => {
    setEditingContract(null);
    setCopyingContract(false);
    setModalOpen(true);
  };

  const handleEdit = (contract: ContractInterface) => {
    setEditingContract(contractFormatted(contract));
    setCopyingContract(false);
    setModalOpen(true);
  };

  const handleCopy = (contract: ContractInterface) => {
    setEditingContract(contractFormatted(contract));
    setCopyingContract(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteContract.mutate(id);
  };

  const handleSubmit = (contract: ContractInterface) => {
    if (contract.id && !copyingContract) {
      updateContract.mutate(contract);
    } else {
      createContract.mutate(contract);
    }
    setModalOpen(false);
    setEditingContract(null);
    setCopyingContract(false);
  };

  const handlePreviewContract = (contract: ContractInterface) => {
    setPreviewContract(contract);
  };

  const handlePreviewCashOrder = (contract: ContractInterface) => {
    setPreviewCashOrder(contract);
  };

  const handlePageChange = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

  const handleStartDateChange = (date: string | null) => {
    setUrlSearchParams({ startDate: date });
  };

  const handleEndDateChange = (date: string | null) => {
    setUrlSearchParams({ endDate: date });
  };

  const filtered = contracts.filter((c: ContractInterface) => {

    const matchesSearch = c.fullName?.toLowerCase().includes(search.toLowerCase());
    

      let matchesDateRange = true;
      if (startDate || endDate) {
        const contractDateOnly = c.contractDate.split('T')[0];
        
        if (startDate && contractDateOnly < startDate) {
          matchesDateRange = false;
        }
        if (endDate && contractDateOnly > endDate) {
          matchesDateRange = false;
        }
      }
    
    return matchesSearch && matchesDateRange;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sort];
    const bVal = b[sort];
    return String(aVal).localeCompare(String(bVal));
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = sorted.slice(startIndex, endIndex);

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
    <List
      label="договір"
      onAdd={handleAdd}
      searchKey="fullName"
      sortOptions={[
        { value: "contractDate", label: "За датою договору" },
        { value: "fullName", label: "За ПІБ" },
      ]}
      dateRange={{
        startDate,
        endDate,
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange,
        label: "Фільтр по даті договору",
      }}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    >
      <ContractTable
        contracts={paginatedData}
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
        initialValues={editingContract}
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
    </List>
  );
};

export default ContractList;
