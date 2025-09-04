import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OrganizationTable from "../../../components/organizationComponents/OrganizationTable";
import { OrganizationInterface } from "../../../types/organization";

vi.mock("../../../components/Table", () => ({
  default: ({ data, columns, renderActions }: any) => (
    <table data-testid="general-table">
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            {columns.map((col: any) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
            <td>{renderActions(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("../../../components/Actions", () => ({
  default: ({ onEdit, onCopy, onDelete }: any) => (
    <div data-testid="actions">
      <button data-testid="edit-button" onClick={() => onEdit()}>
        Edit
      </button>
      <button data-testid="copy-button" onClick={() => onCopy()}>
        Copy
      </button>
      <button data-testid="delete-button" onClick={() => onDelete()}>
        Delete
      </button>
    </div>
  ),
}));

describe("OrganizationTable", () => {
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

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    organizations: mockOrganizations,
    onEdit: mockOnEdit,
    onCopy: mockOnCopy,
    onDelete: mockOnDelete,
  };

  it("renders table with correct columns and data", () => {
    render(<OrganizationTable {...defaultProps} />);

    const table = screen.getByTestId("general-table");
    expect(table).toBeInTheDocument();

    expect(screen.getByText("Назва організації")).toBeInTheDocument();
    expect(screen.getByText("Скорочена назва")).toBeInTheDocument();
    expect(screen.getByText("ЄДРПОУ")).toBeInTheDocument();
    expect(screen.getByText("Керівник")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();

    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("32222222")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Company Trust")).toBeInTheDocument();
    expect(screen.getByText("Trust")).toBeInTheDocument();
    expect(screen.getByText("33333333")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders Actions component for each organization", () => {
    render(<OrganizationTable {...defaultProps} />);

    const actions = screen.getAllByTestId("actions");
    expect(actions).toHaveLength(2);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<OrganizationTable {...defaultProps} />);

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockOrganizations[0]);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(<OrganizationTable {...defaultProps} />);

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[1]);
    expect(mockOnCopy).toHaveBeenCalledWith(mockOrganizations[1]);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<OrganizationTable {...defaultProps} />);

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockOrganizations[0].id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("renders empty table when no organizations are provided", () => {
    render(<OrganizationTable {...defaultProps} organizations={[]} />);

    const table = screen.getByTestId("general-table");
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
    expect(screen.queryByText("Test Company")).not.toBeInTheDocument();
  });
});
