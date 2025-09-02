import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderItemTable from "../../../components/orderItemComponents/OrderItemTable";
import { OrderItemInterface } from "../../../types/orderItem";

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

describe("OrderItemTable", () => {
  const mockOrderItems: OrderItemInterface[] = [
    {
      id: 1,
      orderId: 1,
      employeeId: 1,
      fieldId: 1,
      value: "Some orderItem",
      valueId: 1,
      orderNumber: "Some order",
      orderDate: "2021-01-01",
      employeeFullName: "Some employee",
      fieldDefinitionName: "Some field",
    },
    {
      id: 2,
      orderId: 2,
      employeeId: 2,
      fieldId: 2,
      value: "Some orderItem2",
      valueId: 2,
      orderNumber: "Some order2",
      orderDate: "2021-01-02",
      employeeFullName: "Some employee2",
      fieldDefinitionName: "Some field2",
    },
    {
      id: 3,
      orderId: 3,
      employeeId: 3,
      fieldId: 3,
      value: "Some orderItem3",
      valueId: 3,
      orderNumber: "Some order3",
      orderDate: "2021-01-03",
      employeeFullName: "Some employee3",
      fieldDefinitionName: "Some field3",
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders orderItems table", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT OrderItem")).toBeInTheDocument();
    expect(screen.getByText("HR OrderItem")).toBeInTheDocument();
    expect(screen.getByText("Finance OrderItem")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Назва відділу")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each orderItem", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
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
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockOrderItems[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockOrderItems[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockOrderItems[0].id);
  });

  it("renders empty table when no orderItems", () => {
    render(
      <OrderItemTable
        orderItems={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Назва відділу")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT OrderItem")).not.toBeInTheDocument();
  });

  it("displays orderItem IDs correctly", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays orderItem names correctly", () => {
    render(
      <OrderItemTable
        orderItems={mockOrderItems}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT OrderItem")).toBeInTheDocument();
    expect(screen.getByText("HR OrderItem")).toBeInTheDocument();
    expect(screen.getByText("Finance OrderItem")).toBeInTheDocument();
  });
});
