import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import WorkScheduleForm from "../../../components/workScheduleComponents/WorkScheduleForm";
import { WorkScheduleInterface } from "../../../types/workSchedule";

describe("WorkScheduleForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields with default values", () => {
    render(<WorkScheduleForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    const initialValues: WorkScheduleInterface = {
      id: 1,
      workScheduleName: "Some workSchedule",
      hoursPerWeek: 40,
    };

    render(
      <WorkScheduleForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        onClose={() => {}}
      />
    );

    const workScheduleNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(workScheduleNameInput.value).toBe("Some workSchedule");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<WorkScheduleForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          workScheduleName: "1234567890",
        }),
        expect.any(Object)
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          workScheduleName: "1234567890",
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
    render(<WorkScheduleForm onSubmit={slowOnSubmit} onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<WorkScheduleForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
