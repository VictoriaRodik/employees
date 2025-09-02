import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderTypeTable from "../../../components/orderTypeComponents/OrderTypeTable";
import { OrderTypeInterface } from "../../../types/orderType";

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

describe("OrderTypeTable", () => {
  const mockOrderTypes: OrderTypeInterface[] = [
    { id: 1, orderTypeName: "IT OrderType" },
    { id: 2, orderTypeName: "HR OrderType" },
    { id: 3, orderTypeName: "Finance OrderType" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders orderTypes table", () => {
    render(
      <OrderTypeTable
        orderTypes={mockOrderTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT OrderType")).toBeInTheDocument();
    expect(screen.getByText("HR OrderType")).toBeInTheDocument();
    expect(screen.getByText("Finance OrderType")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <OrderTypeTable
        orderTypes={mockOrderTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each orderType", () => {
    render(
      <OrderTypeTable
        orderTypes={mockOrderTypes}
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
      <OrderTypeTable
        orderTypes={mockOrderTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockOrderTypes[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <OrderTypeTable
        orderTypes={mockOrderTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockOrderTypes[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <OrderTypeTable
        orderTypes={mockOrderTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockOrderTypes[0].id);
  });

  it("renders empty table when no orderTypes", () => {
    render(
      <OrderTypeTable
        orderTypes={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT OrderType")).not.toBeInTheDocument();
  });

  it("displays orderType names correctly", () => {
    render(
      <OrderTypeTable
        orderTypes={mockOrderTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT OrderType")).toBeInTheDocument();
    expect(screen.getByText("HR OrderType")).toBeInTheDocument();
    expect(screen.getByText("Finance OrderType")).toBeInTheDocument();
  });
});
