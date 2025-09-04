import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderForm from "../../../components/orderComponents/OrderForm";
import { useOrderTypes } from "../../../hooks/useOrderTypes";
import { OrderInterface } from "../../../types/order";
import { OrderTypeInterface } from "../../../types/orderType";

vi.mock("../../../hooks/useOrderTypes", () => ({
  useOrderTypes: vi.fn(),
}));

describe("OrderForm", () => {
  const mockOrderTypes: OrderTypeInterface[] = [
    {
      id: 1,
      orderTypeName: "Test order type",
    },
    {
      id: 2,
      orderTypeName: "Test order type 2",
    },
  ];

  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useOrderTypes as any).mockReturnValue({ data: mockOrderTypes });
  });

  it("renders all fields with default values", () => {
    render(<OrderForm {...defaultProps} />);

    expect(screen.getByLabelText("Тип")).toBeInTheDocument();
    expect(screen.getByLabelText("Номер")).toBeInTheDocument();
    expect(screen.getByLabelText("Дата")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders options in select fields", async () => {
    render(<OrderForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Тип"));
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByText("Test order type")).toBeInTheDocument();
    expect(within(listbox).getByText("Test order type 2")).toBeInTheDocument();
  });

  it("renders with initial values when provided", async () => {
    const initialValues: OrderInterface = {
      id: 1,
      orderTypeId: 1,
      orderTypeName: "Test order type",
      orderDate: "2023-01-01",
      orderNumber: "C123",
    } as unknown as OrderInterface;

    render(<OrderForm {...defaultProps} initialValues={initialValues} />);

    const orderDateInput = screen.getByLabelText("Дата") as HTMLInputElement;

    await waitFor(() => {
      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveTextContent("Test order type");
      expect(orderDateInput.value).toBe("2023-01-01");
    });
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<OrderForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Тип"));
    const listbox = await screen.findByRole("listbox");
    await userEvent.click(within(listbox).getByRole("option", { name: "Test order type" }));

    fireEvent.change(screen.getByLabelText("Дата"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Номер"), {
      target: { value: "C123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderTypeId: 1,
          orderDate: "2023-01-01",
          orderNumber: "C123",
        }),
        expect.any(Object)
      );
    });
  });

  it("disables submit button when submitting", async () => {
    const slowOnSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    render(<OrderForm {...defaultProps} onSubmit={slowOnSubmit} />);

    await userEvent.click(screen.getByLabelText("Тип"));
    const listbox2 = await screen.findByRole("listbox");
    await userEvent.click(within(listbox2).getByRole("option", { name: "Test order type" }));

    fireEvent.change(screen.getByLabelText("Дата"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Номер"), {
      target: { value: "C123" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<OrderForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it("shows validation errors on submit with invalid data", async () => {
    render(<OrderForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      const errors = screen.getAllByText("Обов'язкове поле");
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
