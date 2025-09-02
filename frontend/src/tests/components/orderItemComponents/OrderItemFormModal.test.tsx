import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderItemFormModal from "../../../components/orderItemComponents/OrderItemFormModal";
import { OrderItemInterface } from "../../../types/orderItem";

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

describe("OrderItemFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<OrderItemFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<OrderItemFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders OrderItemForm with passed props", () => {
    const initialValues: OrderItemInterface = {
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
    };

    render(
      <OrderItemFormModal {...defaultProps} initialValues={initialValues} />
    );

    const orderItemNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(orderItemNameInput.value).toBe("Some orderItem");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to OrderItemForm and calls it with valid data", async () => {
    render(<OrderItemFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderItemName: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
