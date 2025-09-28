import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrganizationList from "../../../components/organizationComponents/OrganizationList";
import { useOrganizations } from "../../../hooks/useOrganizations";
import { OrganizationInterface } from "../../../types/organization";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SortProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

interface OrganizationTableProps {
  organizations: OrganizationInterface[];
  onEdit: (organization: OrganizationInterface) => void;
  onCopy: (organization: OrganizationInterface) => void;
  onDelete: (id: number) => void;
}

interface OrganizationFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (organization: OrganizationInterface) => void;
  initialValues?: OrganizationInterface;
}

vi.mock("../../../hooks/useOrganizations", () => ({
  useOrganizations: vi.fn(),
}));

vi.mock("../../../hooks/useUrlSearchParams", () => ({
  useUrlSearchParams: () => ({
    searchParams: { get: vi.fn(() => "") },
    setSearchParams: vi.fn(),
  }),
}));

vi.mock("../../../components/Search", () => ({
  default: ({ value, onChange }: SearchProps) => (
    <input data-testid="search-input" value={value} onChange={onChange} />
  ),
}));

vi.mock("../../../components/Sort", () => ({
  default: ({ value, onChange, options }: SortProps) => (
    <select data-testid="sort-select" value={value} onChange={onChange}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

vi.mock("../../../components/Button", () => ({
  default: ({ onClick, children }: ButtonProps) => (
    <button data-testid="add-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("../../../components/organizationComponents/OrganizationTable", () => ({
  default: ({
    organizations,
    onEdit,
    onCopy,
    onDelete,
  }: OrganizationTableProps) => (
    <div data-testid="organization-table">
      {organizations.map((emp: OrganizationInterface) => (
        <div key={emp.id}>
          <span>{emp.name}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock(
  "../../../components/organizationComponents/OrganizationFormModal",
  () => {
    const defaultValues: OrganizationInterface = {
      id: 0,
      name: "",
      shortName: "",
      edrpouCode: "",
      legalAddress: "",
      phone: "",
      bankAccount: "",
      bankName: "",
      foundationDoc: "",
      directorPosition: "",
      directorFullName: "",
    };

    return {
      default: ({
        open,
        title,
        onClose,
        onSubmit,
        initialValues,
      }: OrganizationFormModalProps) =>
        open ? (
          <div data-testid="modal">
            <h1>{title}</h1>
            <button
              onClick={() =>
                onSubmit({
                  ...defaultValues,
                  ...(initialValues || {}),
                  id: initialValues?.id || 0,
                } as OrganizationInterface)
              }
            >
              Submit
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        ) : null,
    };
  }
);

describe("OrganizationList", () => {
  const mockOrganizations: OrganizationInterface[] = [
    {
      id: 1,
      name: "Test Company",
      shortName: "Company",
      edrpouCode: "32222222",
      legalAddress: "Some street",
      phone: "0362",
      bankAccount: "UA112222220000000000000000000",
      bankName: "Big Bank",
      foundationDoc: "Document",
      directorPosition: "director",
      directorFullName: "John Doe",
    },
    {
      id: 2,
      name: "Company Trust ",
      shortName: "Trust",
      edrpouCode: "33333333",
      legalAddress: "Some street",
      phone: "0362",
      bankAccount: "UA112222220000000000000000003",
      bankName: "Big Bank",
      foundationDoc: "Document",
      directorPosition: "director",
      directorFullName: "Jane Smith",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useOrganizations as any).mockReturnValue({ isLoading: true });
    render(<OrganizationList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useOrganizations as any).mockReturnValue({ error: true });
    render(<OrganizationList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders organizations and components when loaded", () => {
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
    });
    render(<OrganizationList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("organization-table")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Company Trust")).toBeInTheDocument();
  });

  it.skip("filters organizations by search", async () => {
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
    });
    render(<OrganizationList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "test" },
    });
    expect(screen.getByText("Company Trust")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Test Company")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts organizations by selected field", async () => {
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
    });
    render(<OrganizationList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "edrpouCode" },
    });
    const table = screen.getByTestId("organization-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Test Company");
    expect(rows[0].textContent).toContain("Company Trust");
  });

  it("opens modal to add organization", () => {
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
    });
    render(<OrganizationList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit organization", () => {
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
    });
    render(<OrganizationList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy organization", () => {
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
    });
    render(<OrganizationList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Копіювання")).toBeInTheDocument();
  });

  it("deletes organization", () => {
    const deleteOrganization = { mutate: vi.fn() };
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
      deleteOrganization,
    });
    render(<OrganizationList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteOrganization.mutate).toHaveBeenCalledWith(2);
  });

  it("submits new organization", async () => {
    const createOrganization = { mutate: vi.fn() };
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
      createOrganization,
    });
    render(<OrganizationList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createOrganization.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing organization", async () => {
    const updateOrganization = { mutate: vi.fn() };
    (useOrganizations as any).mockReturnValue({
      data: mockOrganizations,
      isLoading: false,
      error: null,
      updateOrganization,
    });
    render(<OrganizationList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateOrganization.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 2 })
      );
    });
  });
});
