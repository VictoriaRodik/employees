import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EmploymentConditionForm from "../../../components/employmentConditionComponents/EmploymentConditionForm";
import { EmploymentConditionInterface } from "../../../types/employmentCondition";

describe("EmploymentConditionForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields with default values", () => {
    render(<EmploymentConditionForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    const initialValues: EmploymentConditionInterface = {
      id: 1,
      employmentConditionName: "Some employmentcondition",
    };

    render(
      <EmploymentConditionForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        onClose={() => {}}
      />
    );

    const employmentconditionNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(employmentconditionNameInput.value).toBe("Some employmentcondition");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<EmploymentConditionForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "Employment Condition" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          employmentConditionName: "Employment Condition",
        }),
        expect.any(Object)
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          employmentConditionName: "Employment Condition",
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
    render(<EmploymentConditionForm onSubmit={slowOnSubmit} onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "Employment Condition" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<EmploymentConditionForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
