import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderTypeList from "../../../components/orderTypeComponents/OrderTypeList";
import { useOrderTypes } from "../../../hooks/useOrderTypes";
import { OrderTypeInterface } from "../../../types/orderType";

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

interface OrderTypeTableProps {
  orderTypes: OrderTypeInterface[];
  onEdit: (orderType: OrderTypeInterface) => void;
  onCopy: (orderType: OrderTypeInterface) => void;
  onDelete: (id: number) => void;
}

interface OrderTypeFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (orderType: OrderTypeInterface) => void;
  initialValues?: OrderTypeInterface;
}

vi.mock("../../../hooks/useOrderTypes", () => ({
  useOrderTypes: vi.fn(),
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

vi.mock("../../../components/orderTypeComponents/OrderTypeTable", () => ({
  default: ({ orderTypes, onEdit, onCopy, onDelete }: OrderTypeTableProps) => (
    <div data-testid="orderType-table">
      {orderTypes.map((emp: OrderTypeInterface) => (
        <div key={emp.id}>
          <span>{emp.orderTypeName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/orderTypeComponents/OrderTypeFormModal", () => {
  const defaultValues: OrderTypeInterface = {
    id: 0,
    orderTypeName: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: OrderTypeFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as OrderTypeInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("OrderTypeList", () => {
  const mockOrderTypes: OrderTypeInterface[] = [
    {
      id: 1,
      orderTypeName: "Some orderType",
    },
    {
      id: 2,
      orderTypeName: "Some orderType2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useOrderTypes as any).mockReturnValue({ isLoading: true });
    render(<OrderTypeList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useOrderTypes as any).mockReturnValue({ error: true });
    render(<OrderTypeList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders orderTypes and components when loaded", () => {
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
    });
    render(<OrderTypeList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("orderType-table")).toBeInTheDocument();
    expect(screen.getByText("Some orderType")).toBeInTheDocument();
    expect(screen.getByText("Some orderType2")).toBeInTheDocument();
  });

  it.skip("filters orderTypes by search", async () => {
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
    });
    render(<OrderTypeList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some orderType" },
    });
    expect(screen.getByText("Some orderType")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some orderType2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts orderTypes by selected field", async () => {
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
    });
    render(<OrderTypeList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "orderTypeName" },
    });
    const table = screen.getByTestId("orderType-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some orderType2");
    expect(rows[0].textContent).toContain("Some orderType");
  });

  it("opens modal to add orderType", () => {
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
    });
    render(<OrderTypeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit orderType", () => {
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
    });
    render(<OrderTypeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy orderType", () => {
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
    });
    render(<OrderTypeList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes orderType", () => {
    const deleteOrderType = { mutate: vi.fn() };
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
      deleteOrderType,
    });
    render(<OrderTypeList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteOrderType.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new orderType", async () => {
    const createOrderType = { mutate: vi.fn() };
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
      createOrderType,
    });
    render(<OrderTypeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createOrderType.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing orderType", async () => {
    const updateOrderType = { mutate: vi.fn() };
    (useOrderTypes as any).mockReturnValue({
      data: mockOrderTypes,
      isLoading: false,
      error: null,
      updateOrderType,
    });
    render(<OrderTypeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateOrderType.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
