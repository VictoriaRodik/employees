import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GradeSalaryFormModal from "../../../components/gradeSalaryComponents/GradeSalaryFormModal";
import { GradeSalaryInterface } from "../../../types/gradeSalary";

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

describe("GradeSalaryFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<GradeSalaryFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<GradeSalaryFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders GradeSalaryForm with passed props", () => {
    const initialValues: GradeSalaryInterface = {
      id: 1,
      grade: "Some gradeSalary",
      baseSalary: 10000,
      effectiveFrom: "2021-01-01",
      gradeId: 0
    };

    render(
      <GradeSalaryFormModal {...defaultProps} initialValues={initialValues} />
    );

    const gradeSalaryNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(gradeSalaryNameInput.value).toBe("Some gradeSalary");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to GradeSalaryForm and calls it with valid data", async () => {
    render(<GradeSalaryFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          gradeSalaryName: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
