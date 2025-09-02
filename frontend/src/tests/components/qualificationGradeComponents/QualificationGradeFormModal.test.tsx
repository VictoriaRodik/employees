import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QualificationGradeFormModal from "../../../components/qualificationGradeComponents/QualificationGradeFormModal";
import { QualificationGradeInterface } from "../../../types/qualificationGrade";

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

describe("QualificationGradeFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<QualificationGradeFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<QualificationGradeFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders QualificationGradeForm with passed props", () => {
    const initialValues: QualificationGradeInterface = {
      id: 1,
      grade: "Some qualificationGrade",
    };

    render(
      <QualificationGradeFormModal {...defaultProps} initialValues={initialValues} />
    );

    const qualificationGradeNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(qualificationGradeNameInput.value).toBe("Some qualificationGrade");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to QualificationGradeForm and calls it with valid data", async () => {
    render(<QualificationGradeFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          grade: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
