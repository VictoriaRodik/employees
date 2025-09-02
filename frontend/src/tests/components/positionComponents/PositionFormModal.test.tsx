import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PositionFormModal from "../../../components/positionComponents/PositionFormModal";
import { PositionInterface } from "../../../types/position";

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

describe("PositionFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<PositionFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<PositionFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders PositionForm with passed props", () => {
    const initialValues: PositionInterface = {
      id: 1,
      positionName: "Some position",
    };

    render(
      <PositionFormModal {...defaultProps} initialValues={initialValues} />
    );

    const positionNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(positionNameInput.value).toBe("Some position");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to PositionForm and calls it with valid data", async () => {
    render(<PositionFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          positionName: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
