import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GradeSalaryForm from "../../../components/gradeSalaryComponents/GradeSalaryForm";
import { useQualificationGrades } from "../../../hooks/useQualificationGrades";
import { GradeSalaryInterface } from "../../../types/gradeSalary";
import { QualificationGradeInterface } from "../../../types/qualificationGrade";

vi.mock("../../../hooks/useQualificationGrades", () => ({
  useQualificationGrades: vi.fn(),
}));

vi.mock("../../../hooks/useGradeSalarys", () => ({
  useGradeSalarys: vi.fn(),
}));

describe("GradeSalaryForm", () => {
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

  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
    });
  });

  it("renders all fields with default values", () => {
    render(<GradeSalaryForm {...defaultProps} />);

    expect(screen.getByLabelText("Розряд")).toBeInTheDocument();
    expect(screen.getByLabelText("Базова зарплата")).toBeInTheDocument();
    expect(screen.getByLabelText("Діє з")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders options in select fields", async () => {
    render(<GradeSalaryForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Розряд"));
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByText("1")).toBeInTheDocument();
    expect(within(listbox).getByText("2")).toBeInTheDocument();
  });

  it("renders with initial values when provided", async () => {
    const initialValues: GradeSalaryInterface = {
      id: 1,
      baseSalary: 10000,
      effectiveFrom: "2025-01-01",
      gradeId: 1,
      grade: "1",
    };

    render(<GradeSalaryForm {...defaultProps} initialValues={initialValues} />);

    const gradeSalaryNameInput = screen.getByLabelText(
      "Базова зарплата"
    ) as HTMLInputElement;

    await waitFor(() => {
      const hiddenInput = screen.getByDisplayValue("10000");
      expect(hiddenInput).toHaveAttribute("name", "baseSalary");
      expect(gradeSalaryNameInput.value).toBe("10000");
    });
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<GradeSalaryForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Розряд"));
    const listbox = await screen.findByRole("listbox");
    await userEvent.click(within(listbox).getByRole("option", { name: "1" }));

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
          baseSalary: "20000",
          effectiveFrom: "2025-07-01",
          gradeId: 1,
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
    render(<GradeSalaryForm {...defaultProps} onSubmit={slowOnSubmit} />);

    await userEvent.click(screen.getByLabelText("Розряд"));
    const listbox2 = await screen.findByRole("listbox");
    await userEvent.click(within(listbox2).getByRole("option", { name: "1" }));

    fireEvent.change(screen.getByLabelText("Базова зарплата"), {
      target: { value: "30000" },
    });

    fireEvent.change(screen.getByLabelText("Діє з"), {
      target: { value: "2025-07-01" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<GradeSalaryForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it("shows validation errors on submit with invalid data", async () => {
    render(<GradeSalaryForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      const errors = screen.getAllByText("Обов'язкове поле");
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
