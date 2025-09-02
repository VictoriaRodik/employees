import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReferenceSourceFormModal from "../../../components/referenceSourceComponents/ReferenceSourceFormModal";
import { ReferenceSourceInterface } from "../../../types/referenceSource";

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

describe("ReferenceSourceFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<ReferenceSourceFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<ReferenceSourceFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders ReferenceSourceForm with passed props", () => {
    const initialValues: ReferenceSourceInterface = {
      id: 1,
      tableName: "Some referenceSource",
    };

    render(
      <ReferenceSourceFormModal {...defaultProps} initialValues={initialValues} />
    );

    const referenceSourceNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(referenceSourceNameInput.value).toBe("Some referenceSource");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to ReferenceSourceForm and calls it with valid data", async () => {
    render(<ReferenceSourceFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          tableName: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
