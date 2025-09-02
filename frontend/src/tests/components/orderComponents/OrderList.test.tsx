import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderList from "../../../components/orderComponents/OrderList";
import { useOrders } from "../../../hooks/useOrders";
import { OrderInterface } from "../../../types/order";

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

interface OrderTableProps {
  orders: OrderInterface[];
  onEdit: (order: OrderInterface) => void;
  onCopy: (order: OrderInterface) => void;
  onDelete: (id: number) => void;
}

interface OrderFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (order: OrderInterface) => void;
  initialValues?: OrderInterface;
}

vi.mock("../../../hooks/useOrders", () => ({
  useOrders: vi.fn(),
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

vi.mock("../../../components/orderComponents/OrderTable", () => ({
  default: ({ orders, onEdit, onCopy, onDelete }: OrderTableProps) => (
    <div data-testid="order-table">
      {orders.map((emp: OrderInterface) => (
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

vi.mock("../../../components/orderComponents/OrderFormModal", () => {
  const defaultValues: OrderInterface = {
    id: 0,
    orderNumber: "",
    orderDate: "",
    orderTypeId: 0,
    orderTypeName: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: OrderFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as OrderInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("OrderList", () => {
  const mockOrders: OrderInterface[] = [
    {
      id: 1,
      orderNumber: "Some order",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    },
    {
      id: 2,
      orderNumber: "Some order2",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useOrders as any).mockReturnValue({ isLoading: true });
    render(<OrderList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useOrders as any).mockReturnValue({ error: true });
    render(<OrderList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders orders and components when loaded", () => {
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    });
    render(<OrderList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("order-table")).toBeInTheDocument();
    expect(screen.getByText("Some order")).toBeInTheDocument();
    expect(screen.getByText("Some order2")).toBeInTheDocument();
  });

  it.skip("filters orders by search", async () => {
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    });
    render(<OrderList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some order" },
    });
    expect(screen.getByText("Some order")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some order2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts orders by selected field", async () => {
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    });
    render(<OrderList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "orderName" },
    });
    const table = screen.getByTestId("order-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some order2");
    expect(rows[0].textContent).toContain("Some order");
  });

  it("opens modal to add order", () => {
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    });
    render(<OrderList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit order", () => {
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    });
    render(<OrderList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy order", () => {
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    });
    render(<OrderList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes order", () => {
    const deleteOrder = { mutate: vi.fn() };
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
      deleteOrder,
    });
    render(<OrderList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteOrder.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new order", async () => {
    const createOrder = { mutate: vi.fn() };
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
      createOrder,
    });
    render(<OrderList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createOrder.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing order", async () => {
    const updateOrder = { mutate: vi.fn() };
    (useOrders as any).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
      updateOrder,
    });
    render(<OrderList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateOrder.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
