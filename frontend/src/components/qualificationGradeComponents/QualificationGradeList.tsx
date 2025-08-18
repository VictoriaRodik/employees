import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import QualificationGradeTable from "./QualificationGradeTable";
import QualificationGradeFormModal from "./QualificationGradeFormModal";
import { useQualificationGrades } from "../../hooks/useQualificationGrades";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { QualificationGradeInterface } from "../../types/qualificationGrade";
import { qualificationGradeFormatted } from "../../utils/qualificationGradeFormatted";
import List from "../List";

const QualificationGradeList = () => {
  const {
    data: qualificationGrades = [],
    isLoading,
    error,
    createQualificationGrade,
    updateQualificationGrade,
    deleteQualificationGrade,
  } = useQualificationGrades();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingQualificationGrade, setEditingQualificationGrade] =
    useState<QualificationGradeInterface | null>(null);
  const [copyingQualificationGrade, setCopyingQualificationGrade] =
    useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof QualificationGradeInterface) ||
    "grade";

  const handleAdd = () => {
    setEditingQualificationGrade(null);
    setCopyingQualificationGrade(false);
    setModalOpen(true);
  };

  const handleEdit = (qualificationGrade: QualificationGradeInterface) => {

    setEditingQualificationGrade(
      qualificationGradeFormatted(qualificationGrade)
    );
    setCopyingQualificationGrade(false);
    setModalOpen(true);
  };

  const handleCopy = (qualificationGrade: QualificationGradeInterface) => {
    setEditingQualificationGrade(
      qualificationGradeFormatted(qualificationGrade)
    );
    setCopyingQualificationGrade(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteQualificationGrade.mutate(id);
  };

  const handleSubmit = (qualificationGrade: QualificationGradeInterface) => {
    if (qualificationGrade.id && !copyingQualificationGrade) {
      updateQualificationGrade.mutate(qualificationGrade);
    } else {
      createQualificationGrade.mutate(qualificationGrade);
    }

    setModalOpen(false);
    setEditingQualificationGrade(null);
    setCopyingQualificationGrade(false);
  };

  const filtered = qualificationGrades.filter(
    (e: { grade: number }) => e.grade?.toString().includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (sort === "id") {
      return Number(aValue) - Number(bValue);
    }

    return String(aValue).localeCompare(String(bValue));
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
    <List
      label="розряд"
      onAdd={handleAdd}
      searchKey="grade"
      sortOptions={[
        { value: "grade", label: "За назвою" },
        { value: "id", label: "За замовчуванням" },
      ]}
    >
      <QualificationGradeTable
        qualificationGrades={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <QualificationGradeFormModal
        open={modalOpen}
        title={
          editingQualificationGrade && !copyingQualificationGrade
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingQualificationGrade}
      />
    </List>
  );
};

export default QualificationGradeList;
