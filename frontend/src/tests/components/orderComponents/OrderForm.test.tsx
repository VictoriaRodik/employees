import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import OrderForm from "../../../components/orderComponents/OrderForm";
import { OrderInterface } from "../../../types/order";

describe("OrderForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields with default values", () => {
    render(<OrderForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    const initialValues: OrderInterface = {
      id: 1,
      orderNumber: "Some order",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    };

    render(
      <OrderForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        onClose={() => {}}
      />
    );

    const orderNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(orderNameInput.value).toBe("Some order");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<OrderForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderName: "1234567890",
        }),
        expect.any(Object)
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderName: "1234567890",
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
    render(<OrderForm onSubmit={slowOnSubmit} onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<OrderForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
