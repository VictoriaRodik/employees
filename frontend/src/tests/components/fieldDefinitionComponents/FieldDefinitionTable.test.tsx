import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FieldDefinitionTable from "../../../components/fieldDefinitionComponents/FieldDefinitionTable";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";

interface ActionsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

vi.mock("../../../components/Actions", () => ({
  default: ({ onEdit, onCopy, onDelete }: ActionsProps) => (
    <div data-testid="action-buttons">
      <button data-testid="edit-button" onClick={onEdit}>
        Edit
      </button>
      <button data-testid="copy-button" onClick={onCopy}>
        Copy
      </button>
      <button data-testid="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  ),
}));

describe("FieldDefinitionTable", () => {
  const mockFieldDefinitions: FieldDefinitionInterface[] = [
    {
      id: 1,
      fieldName: "IT FieldDefinition",
      fieldType: "number",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null,
    },
    {
      id: 2,
      fieldName: "HR FieldDefinition",
      fieldType: "number",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null,
    },
    {
      id: 3,
      fieldName: "Finance FieldDefinition",
      fieldType: "number",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null,
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders fieldDefinitions table", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT FieldDefinition")).toBeInTheDocument();
    expect(screen.getByText("HR FieldDefinition")).toBeInTheDocument();
    expect(screen.getByText("Finance FieldDefinition")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each fieldDefinition", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const actionButtons = screen.getAllByTestId("action-buttons");
    expect(actionButtons).toHaveLength(3);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockFieldDefinitions[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockFieldDefinitions[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockFieldDefinitions[0].id);
  });

  it("renders empty table when no fieldDefinitions", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT FieldDefinition")).not.toBeInTheDocument();
  });


  it("displays fieldDefinition names correctly", () => {
    render(
      <FieldDefinitionTable
        fieldDefinitions={mockFieldDefinitions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT FieldDefinition")).toBeInTheDocument();
    expect(screen.getByText("HR FieldDefinition")).toBeInTheDocument();
    expect(screen.getByText("Finance FieldDefinition")).toBeInTheDocument();
  });
});
