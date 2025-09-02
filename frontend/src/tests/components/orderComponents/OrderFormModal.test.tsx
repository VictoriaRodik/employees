import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderFormModal from "../../../components/orderComponents/OrderFormModal";
import { OrderInterface } from "../../../types/order";

vi.mock("../../../components/Modal", () => ({
  default: ({ open, title, children }: any) => (
    <div data-testid="modal" role="dialog" aria-label={title}>
      {open && (
        <>
          <h1>{title}</h1>
          {children}
        </>
      )}
    </div>
  ),
}));

describe("OrderFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<OrderFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<OrderFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders OrderForm with passed props", () => {
    const initialValues: OrderInterface = {
      id: 1,
      orderNumber: "Some order",
      orderDate: "2021-01-01",
      orderTypeId: 1,
      orderTypeName: "Some order type",
    };

    render(
      <OrderFormModal {...defaultProps} initialValues={initialValues} />
    );

    const orderNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(orderNameInput.value).toBe("Some order");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to OrderForm and calls it with valid data", async () => {
    render(<OrderFormModal {...defaultProps} />);

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
  });
});
