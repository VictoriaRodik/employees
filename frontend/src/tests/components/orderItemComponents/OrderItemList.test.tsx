import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderItemList from "../../../components/orderItemComponents/OrderItemList";
import { useOrderItems } from "../../../hooks/useOrderItems";
import { OrderItemInterface } from "../../../types/orderItem";

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

interface OrderItemTableProps {
  orderItems: OrderItemInterface[];
  onEdit: (orderItem: OrderItemInterface) => void;
  onCopy: (orderItem: OrderItemInterface) => void;
  onDelete: (id: number) => void;
}

interface OrderItemFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (orderItem: OrderItemInterface) => void;
  initialValues?: OrderItemInterface;
}

vi.mock("../../../hooks/useOrderItems", () => ({
  useOrderItems: vi.fn(),
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

vi.mock("../../../components/orderItemComponents/OrderItemTable", () => ({
  default: ({ orderItems, onEdit, onCopy, onDelete }: OrderItemTableProps) => (
    <div data-testid="orderItem-table">
      {orderItems.map((emp: OrderItemInterface) => (
        <div key={emp.id}>
          <span>{emp.orderNumber}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/orderItemComponents/OrderItemFormModal", () => {
  const defaultValues: OrderItemInterface = {
    id: 0,
    orderId: 1,
    employeeId: 1,
    fieldId: 1,
    value: "Some orderItem",
    valueId: 1,
    orderNumber: "Some order",
    orderDate: "2021-01-01",
    employeeFullName: "Some employee",
    fieldDefinitionName: "Some field",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: OrderItemFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as OrderItemInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("OrderItemList", () => {
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
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useOrderItems as any).mockReturnValue({ isLoading: true });
    render(<OrderItemList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useOrderItems as any).mockReturnValue({ error: true });
    render(<OrderItemList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders orderItems and components when loaded", () => {
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
    });
    render(<OrderItemList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("orderItem-table")).toBeInTheDocument();
    expect(screen.getByText("Some orderItem")).toBeInTheDocument();
    expect(screen.getByText("Some orderItem2")).toBeInTheDocument();
  });

  it.skip("filters orderItems by search", async () => {
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
    });
    render(<OrderItemList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some orderItem" },
    });
    expect(screen.getByText("Some orderItem")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some orderItem2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts orderItems by selected field", async () => {
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
    });
    render(<OrderItemList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "orderItemName" },
    });
    const table = screen.getByTestId("orderItem-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some orderItem2");
    expect(rows[0].textContent).toContain("Some orderItem");
  });

  it("opens modal to add orderItem", () => {
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
    });
    render(<OrderItemList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit orderItem", () => {
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
    });
    render(<OrderItemList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy orderItem", () => {
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
    });
    render(<OrderItemList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes orderItem", () => {
    const deleteOrderItem = { mutate: vi.fn() };
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
      deleteOrderItem,
    });
    render(<OrderItemList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteOrderItem.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new orderItem", async () => {
    const createOrderItem = { mutate: vi.fn() };
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
      createOrderItem,
    });
    render(<OrderItemList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createOrderItem.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing orderItem", async () => {
    const updateOrderItem = { mutate: vi.fn() };
    (useOrderItems as any).mockReturnValue({
      data: mockOrderItems,
      isLoading: false,
      error: null,
      updateOrderItem,
    });
    render(<OrderItemList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateOrderItem.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
