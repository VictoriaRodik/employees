import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderTable from "../../../components/orderComponents/OrderTable";
import { OrderInterface } from "../../../types/order";

interface ActionButtonsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

vi.mock("../../../components/ActionButtons", () => ({
  default: ({ onEdit, onCopy, onDelete }: ActionButtonsProps) => (
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

describe("OrderTable", () => {
  const mockOrders: OrderInterface[] = [
    {
      id: 1,
      orderNumber: "IT Order",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    },
    {
      id: 2,
      orderNumber: "HR Order",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    },
    {
      id: 3,
      orderNumber: "Finance Order",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders orders table", () => {
    render(
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT Order")).toBeInTheDocument();
    expect(screen.getByText("HR Order")).toBeInTheDocument();
    expect(screen.getByText("Finance Order")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Назва відділу")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each order", () => {
    render(
      <OrderTable
        orders={mockOrders}
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
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockOrders[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockOrders[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockOrders[0].id);
  });

  it("renders empty table when no orders", () => {
    render(
      <OrderTable
        orders={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Назва відділу")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT Order")).not.toBeInTheDocument();
  });

  it("displays order IDs correctly", () => {
    render(
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays order names correctly", () => {
    render(
      <OrderTable
        orders={mockOrders}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT Order")).toBeInTheDocument();
    expect(screen.getByText("HR Order")).toBeInTheDocument();
    expect(screen.getByText("Finance Order")).toBeInTheDocument();
  });
});
