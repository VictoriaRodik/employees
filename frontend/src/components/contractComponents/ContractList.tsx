import { useState } from "react";
import ContractTable from "./ContractTable";
import Search from "../Search";
import Sort from "../Sort";
import Button from "../Button";
import ContractFormModal from "./ContractFormModal";
import { useContracts } from "../../hooks/useContracts";
import { ContractInterface } from "../../types/contract";
import { Container } from "@mui/material";
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

  const handleAdd = () => {
    setEditingContract(null);
    setModalOpen(true);
  };

  const handleEdit = (contract: ContractInterface) => {
    setEditingContract(contractFormatted(contract));
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteContract.mutate(id);
  };

  const handleSubmit = async (contract: ContractInterface) => {
    if (contract.id) {
     await updateContract.mutate(contract);
    } else {
     await createContract.mutate(contract);
    }
    setModalOpen(false);
  };

  const filteredContracts = contracts.filter((e: ContractInterface) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedContracts = [...filteredContracts].sort((a, b) => {
    const key = sort as keyof ContractInterface;
    return String(a[key]).localeCompare(String(b[key]));
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка при завантаженні</p>;

  return (
    <Container maxWidth="md">
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      <Sort
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        options={[
          { value: "fullName", label: "За ПІБ" },
          { value: "contractDate", label: "За датою договору" },
        ]}
      />
      <ContractTable
        contracts={sortedContracts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Button onClick={handleAdd}>Додати договір</Button>
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
