import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeFormModal from "../../components/employeeComponents/EmployeeFormModal";
import { EmployeeInterface } from "../../types/employee";

vi.mock("../../components/Modal", () => ({
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

describe("EmployeeFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<EmployeeFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<EmployeeFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
  });

  it("renders EmployeeForm with passed props", () => {
    const initialValues: EmployeeInterface = {
      id: 1,
      taxId: "1234567890",
      fullName: "John Doe",
      address: "123 Main St",
      passportSeries: "AB",
      passportNumber: "123456",
      passportIssueDate: "2023-01-01",
      passportIssuedBy: "Local Office",
      personnelNumber: "001",
    };

    render(
      <EmployeeFormModal {...defaultProps} initialValues={initialValues} />
    );

    const taxIdInput = screen.getByLabelText(
      "Податковий номер"
    ) as HTMLInputElement;
    expect(taxIdInput.value).toBe("1234567890");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to EmployeeForm and calls it with valid data", async () => {
    render(<EmployeeFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Податковий номер"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("ПІБ"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Серія паспорта"), {
      target: { value: "СР" },
    });
    fireEvent.change(screen.getByLabelText("Номер паспорта або ID-картки"), {
      target: { value: "123456" },
    });
    fireEvent.change(
      screen.getByLabelText("Дата видачі паспорта або ID-картки"),
      { target: { value: "2023-01-01" } }
    );
    fireEvent.change(
      screen.getByLabelText("Орган видачі паспорта або ID-картки"),
      { target: { value: "5600" } }
    );

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await screen.findByRole("button", { name: "Додати" });
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        taxId: "1234567890",
        fullName: "John Doe",
        passportSeries: "СР",
        passportNumber: "123456",
        passportIssueDate: "2023-01-01",
        passportIssuedBy: "5600",
      }),
      expect.any(Object)
    );
  });
});
