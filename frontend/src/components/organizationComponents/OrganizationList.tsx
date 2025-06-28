import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import OrganizationTable from "./OrganizationTable";
import OrganizationFormModal from "./OrganizationFormModal";
import { useOrganizations } from "../../hooks/useOrganizations";
import { useUrlSearchParams } from "../../hooks/useUrlSearchParams";
import { OrganizationInterface } from "../../types/organization";
import { organizationFormatted } from "../../utils/organizationFormatted";
import List from "../List";

const OrganizationList = () => {
  const {
    data: organizations = [],
    isLoading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  } = useOrganizations();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<OrganizationInterface | null>(null);
  const [copyingOrganization, setCopyingOrganization] = useState(false);

  const { searchParams } = useUrlSearchParams();
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as keyof OrganizationInterface) || "name";

  const handleAdd = () => {
    setEditingOrganization(null);
    setCopyingOrganization(false);
    setModalOpen(true);
  };

  const handleEdit = (organization: OrganizationInterface) => {
    setEditingOrganization(organizationFormatted(organization));
    setCopyingOrganization(false);
    setModalOpen(true);
  };

  const handleCopy = (organization: OrganizationInterface) => {
    setEditingOrganization(organizationFormatted(organization));
    setCopyingOrganization(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteOrganization.mutate(id);
  };

  const handleSubmit = (organization: OrganizationInterface) => {
    if (organization.id && !copyingOrganization) {
      updateOrganization.mutate(organization);
    } else {
      createOrganization.mutate(organization);
    }
    setModalOpen(false);
    setEditingOrganization(null);
    setCopyingOrganization(false);
  };

  const filtered = organizations.filter((e: { name: string }) =>
    e.name?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sort];
    const bVal = b[sort];
    return String(aVal).localeCompare(String(bVal));
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
      label="організацію"
      onAdd={handleAdd}
      searchKey="name"
      sortOptions={[
        { value: "name", label: "За назвою" },
        { value: "edrpouCode", label: "За ЄДРПОУ" },
      ]}
    >
      <OrganizationTable
        organizations={sorted}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <OrganizationFormModal
        open={modalOpen}
        title={
          editingOrganization && !copyingOrganization
            ? `Редагування`
            : "Введення"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingOrganization}
      />
    </List>
  );
};

export default OrganizationList;
