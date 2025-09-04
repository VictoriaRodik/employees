import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GradeSalaryFormModal from "../../../components/gradeSalaryComponents/GradeSalaryFormModal";
import { useQualificationGrades } from "../../../hooks/useQualificationGrades";
import { GradeSalaryInterface } from "../../../types/gradeSalary";
import { QualificationGradeInterface } from "../../../types/qualificationGrade";

vi.mock("../../../hooks/useQualificationGrades", () => ({
  useQualificationGrades: vi.fn(),
}));

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
  const mockQualificationGrades: QualificationGradeInterface[] = [
    {
      id: 1,
      grade: "1",
    },
    {
      id: 2,
      grade: "2",
    },
  ];

  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
    });
  });

  it("renders Modal with correct props when open", () => {
    render(<GradeSalaryFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
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
      grade: "1",
      gradeId: 1,
      baseSalary: 10000,
      effectiveFrom: "2025-01-01",
    };

    render(
      <GradeSalaryFormModal
        {...defaultProps}
        initialValues={initialValues}
      />
    );

    const gradeCombobox = screen.getByRole("combobox");
    expect(gradeCombobox).toHaveTextContent("1");
    const typeInput = screen.getByLabelText("Базова зарплата") as HTMLInputElement;
    expect(typeInput.value).toBe("10000");
    const orderIndexInput = screen.getByLabelText("Діє з") as HTMLInputElement;
    expect(orderIndexInput.value).toBe("2025-01-01");
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Зберегти зміни")).toBeInTheDocument();
  });

  it("passes onSubmit to GradeSalaryForm and calls it with valid data", async () => {
    render(<GradeSalaryFormModal {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Розряд"));
    const listbox = await screen.findByRole("listbox");
    await userEvent.click(within(listbox).getByRole("option", { name: "2" }));

    fireEvent.change(screen.getByLabelText("Базова зарплата"), {
      target: { value: "20000" },
    });
    fireEvent.change(screen.getByLabelText("Діє з"), {
      target: { value: "2025-07-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          gradeId: 2,
          baseSalary: "20000",
          effectiveFrom: "2025-07-01",
        }),

        expect.any(Object)
      );
    });
  });
});
