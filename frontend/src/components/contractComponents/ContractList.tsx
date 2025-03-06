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

  const handleAdd = useCallback(() => {
    setEditingContract(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((contract: ContractInterface) => {
    setEditingContract(contractFormatted(contract));
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    deleteContract.mutate(id);
  }, [deleteContract]);

  const handleSubmit = useCallback(async (contract: ContractInterface) => {
    if (contract.id) {
      await updateContract.mutate(contract);
    } else {
      await createContract.mutate(contract);
    }
    setModalOpen(false);
  }, [createContract, updateContract]);

  const handleSearch = useCallback((e: SelectChangeEvent<string>) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = useCallback((e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
  }, []);

  const filteredContracts = contracts.filter((e: ContractInterface) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedContracts = [...filteredContracts].sort((a, b) => {
    const key = sort as keyof ContractInterface;
    return String(a[key]).localeCompare(String(b[key]));
  });

  if (isLoading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
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
        onDelete={handleDelete}
      />

      <ContractFormModal
        open={modalOpen}
        title={editingContract ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingContract || undefined}
      />
    </Container>
  );
};

export default ContractList;
