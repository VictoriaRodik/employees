import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmploymentConditionFormModal from "../../../components/employmentConditionComponents/EmploymentConditionFormModal";
import { EmploymentConditionInterface } from "../../../types/employmentCondition";

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

describe("EmploymentConditionFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<EmploymentConditionFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<EmploymentConditionFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders EmploymentConditionForm with passed props", () => {
    const initialValues: EmploymentConditionInterface = {
      id: 1,
      employmentConditionName: "Some employmentcondition",
    };

    render(
      <EmploymentConditionFormModal {...defaultProps} initialValues={initialValues} />
    );

    const employmentConditionNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;
    expect(employmentConditionNameInput.value).toBe("Some employmentcondition");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to EmploymentConditionForm and calls it with valid data", async () => {
    render(<EmploymentConditionFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          employmentConditionName: "1234567890",
        }),
        expect.any(Object)
      );
    });
  });
});
