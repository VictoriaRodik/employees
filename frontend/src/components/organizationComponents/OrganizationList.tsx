import { useState, useCallback } from "react";
import OrganizationTable from "./OrganizationTable";
import Search from "../Search";
import Sort from "../Sort";
import Button from "../Button";
import OrganizationFormModal from "./OrganizationFormModal";
import { useOrganizations } from "../../hooks/useOrganizations";
import { OrganizationInterface } from "../../types/organization";
import { Container, CircularProgress } from "@mui/material";
import { organizationFormatted } from "../../utils/organizationFormatted";
import { SelectChangeEvent } from "@mui/material";

const OrganizationList = () => {
  const {
    data: organizations = [],
    isLoading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  } = useOrganizations();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<OrganizationInterface | null>(null);
  const [copyingOrganization, setCopyingOrganization] = useState(false);

  const handleAdd = useCallback(() => {
    setEditingOrganization(null);
    setCopyingOrganization(false);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((organization: OrganizationInterface) => {
    setEditingOrganization(organizationFormatted(organization));
    setModalOpen(true);
  }, []);

  const handleCopy = useCallback((organization: OrganizationInterface) => {
    setEditingOrganization(organizationFormatted(organization));
    setCopyingOrganization(true);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      deleteOrganization.mutate(id);
    },
    [deleteOrganization]
  );

  const handleSubmit = useCallback(
    (organization: OrganizationInterface) => {
      if (organization.id && !copyingOrganization) {
        updateOrganization.mutate(organization);
      } else {
        createOrganization.mutate(organization);
      }
      setModalOpen(false);
      setEditingOrganization(null);
      setCopyingOrganization(false);
    },
    [createOrganization, updateOrganization, copyingOrganization]
  );

  const handleSearch = useCallback((e: SelectChangeEvent<string>) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = useCallback((e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
  }, []);

  const filteredOrganizations = organizations.filter((e: OrganizationInterface) =>
    e.name?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    const key = sort as keyof OrganizationInterface;
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
          { value: "name", label: "За назвою" },
          { value: "shortName", label: "За скороченою назвою" },
        ]}
      />
      <Button onClick={handleAdd}>Додати організацію</Button>
      <OrganizationTable
        organizations={sortedOrganizations}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <OrganizationFormModal
        open={modalOpen}
        title={editingOrganization && !copyingOrganization ? `Редагування` : "Введення"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingOrganization}
      />
    </Container>
  );
};

export default OrganizationList;
