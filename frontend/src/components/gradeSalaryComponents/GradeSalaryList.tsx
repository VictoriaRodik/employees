import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import GradeSalaryTable from "./GradeSalaryTable";
import GradeSalaryFormModal from "./GradeSalaryFormModal";
import { useGradeSalaries } from "../../hooks/useGradeSalaries";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { GradeSalaryInterface } from "../../types/gradeSalary";
import { gradeSalaryFormatted } from "../../utils/gradeSalaryFormatted";
import List from "../List";

const ITEMS_PER_PAGE = 10;

const GradeSalaryList = () => {
  const {
    data: gradeSalaries = [],
    isLoading,
    error,
    createGradeSalary,
    updateGradeSalary,
    deleteGradeSalary,
  } = useGradeSalaries();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingGradeSalary, setEditingGradeSalary] =
    useState<GradeSalaryInterface | null>(null);
  const [copyingGradeSalary, setCopyingGradeSalary] =
    useState(false);

  const { searchParams, setUrlSearchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof GradeSalaryInterface) ||
    "baseSalary";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleAdd = () => {
    setEditingGradeSalary(null);
    setCopyingGradeSalary(false);
    setModalOpen(true);
  };

  const handleEdit = (gradeSalary: GradeSalaryInterface) => {

    setEditingGradeSalary(
      gradeSalaryFormatted(gradeSalary)
    );
    setCopyingGradeSalary(false);
    setModalOpen(true);
  };

  const handleCopy = (gradeSalary: GradeSalaryInterface) => {
    setEditingGradeSalary(
      gradeSalaryFormatted(gradeSalary)
    );
    setCopyingGradeSalary(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteGradeSalary.mutate(id);
  };

  const handleSubmit = (gradeSalary: GradeSalaryInterface) => {
    if (gradeSalary.id && !copyingGradeSalary) {
      updateGradeSalary.mutate(gradeSalary);
    } else {
      createGradeSalary.mutate(gradeSalary);
    }

    setModalOpen(false);
    setEditingGradeSalary(null);
    setCopyingGradeSalary(false);
  };

  const handlePageChange = (page: number) => {
    setUrlSearchParams({ page: page.toString() });
  };

  const filtered = gradeSalaries.filter(
    (e: { baseSalary: number }) => e.baseSalary?.toString().includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (sort === "id") {
      return Number(aValue) - Number(bValue);
    }

    return String(aValue).localeCompare(String(bValue));
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
      label="оклад"
      onAdd={handleAdd}
      searchKey="baseSalary"
      sortOptions={[
        { value: "baseSalary", label: "За назвою" },
        { value: "id", label: "За замовчуванням" },
      ]}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
    >
      <GradeSalaryTable
        gradeSalaries={paginatedData}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <GradeSalaryFormModal
        open={modalOpen}
        title={
          editingGradeSalary && !copyingGradeSalary
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingGradeSalary}
      />
    </List>
  );
};

export default GradeSalaryList;
