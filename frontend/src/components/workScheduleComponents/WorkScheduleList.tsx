import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import WorkScheduleTable from "./WorkSheduleTable";
import WorkScheduleFormModal from "./WorkScheduleFormModal";
import { useWorkSchedules } from "../../hooks/useWorkSchedules";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { WorkScheduleInterface } from "../../types/workSchedule";
import { workScheduleFormatted } from "../../utils/workScheduleFormatted";
import List from "../List";

const WorkScheduleList = () => {
  const {
    data: workSchedules = [],
    isLoading,
    error,
    createWorkSchedule,
    updateWorkSchedule,
    deleteWorkSchedule,
  } = useWorkSchedules();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingWorkSchedule, setEditingWorkSchedule] =
    useState<WorkScheduleInterface | null>(null);
  const [copyingWorkSchedule, setCopyingWorkSchedule] =
    useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof WorkScheduleInterface) ||
    "workScheduleName";

  const handleAdd = () => {
    setEditingWorkSchedule(null);
    setCopyingWorkSchedule(false);
    setModalOpen(true);
  };

  const handleEdit = (workSchedule: WorkScheduleInterface) => {
    setEditingWorkSchedule(
      workScheduleFormatted(workSchedule)
    );
    setCopyingWorkSchedule(false);
    setModalOpen(true);
  };

  const handleCopy = (workSchedule: WorkScheduleInterface) => {
    setEditingWorkSchedule(
      workScheduleFormatted(workSchedule)
    );
    setCopyingWorkSchedule(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteWorkSchedule.mutate(id);
  };

  const handleSubmit = (workSchedule: WorkScheduleInterface) => {
    if (workSchedule.id && !copyingWorkSchedule) {
      updateWorkSchedule.mutate(workSchedule);
    } else {
      createWorkSchedule.mutate(workSchedule);
    }
    setModalOpen(false);
    setEditingWorkSchedule(null);
    setCopyingWorkSchedule(false);
  };

  const filtered = workSchedules.filter(
    (e: { workScheduleName: string }) =>
      e.workScheduleName?.toLowerCase().includes(search.toLowerCase())
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
      label="графік роботи"
      onAdd={handleAdd}
      searchKey="workScheduleName"
      sortOptions={[
        { value: "id", label: "За замовчуванням" },
        { value: "workScheduleName", label: "За назвою" },
      ]}
    >
      <WorkScheduleTable
        workSchedules={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <WorkScheduleFormModal
        open={modalOpen}
        title={
          editingWorkSchedule && !copyingWorkSchedule
            ? `Редагування`
            : copyingWorkSchedule
            ? "Копіювання"
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingWorkSchedule || copyingWorkSchedule ? editingWorkSchedule : null}
      />
    </List>
  );
};

export default WorkScheduleList;
