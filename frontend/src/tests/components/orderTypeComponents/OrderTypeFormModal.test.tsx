import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderTypeFormModal from "../../../components/orderTypeComponents/OrderTypeFormModal";
import { OrderTypeInterface } from "../../../types/orderType";

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

describe("OrderTypeFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<OrderTypeFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<OrderTypeFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders OrderTypeForm with passed props", () => {
    const initialValues: OrderTypeInterface = {
      id: 1,
      orderTypeName: "Some orderType",
    };

    render(
      <OrderTypeFormModal {...defaultProps} initialValues={initialValues} />
    );

    const orderTypeNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(orderTypeNameInput.value).toBe("Some orderType");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to OrderTypeForm and calls it with valid data", async () => {
    render(<OrderTypeFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderTypeName: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
