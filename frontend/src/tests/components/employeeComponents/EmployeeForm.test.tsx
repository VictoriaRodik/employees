import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EmployeeForm from "../../../components/employeeComponents/EmployeeForm";
import { EmployeeInterface } from "../../../types/employee";

describe("EmployeeForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields with default values", () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    expect(screen.getByLabelText("Табельний номер")).toBeInTheDocument();
    expect(screen.getByLabelText("Податковий номер")).toBeInTheDocument();
    expect(screen.getByLabelText("ПІБ")).toBeInTheDocument();
    expect(screen.getByLabelText("Адреса")).toBeInTheDocument();
    expect(screen.getByLabelText("Серія паспорта")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Номер паспорта або ID-картки")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Дата видачі паспорта або ID-картки")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Орган видачі паспорта або ID-картки")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    const initialValues: EmployeeInterface = {
      id: 1,
      taxId: "1234567890",
      fullName: "John Doe",
      address: "123 Main St",
      passportSeries: "СР",
      passportNumber: "123456",
      passportIssueDate: "2023-01-01",
      passportIssuedBy: "5600",
      personnelNumber: "001",
    };

    render(
      <EmployeeForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        onClose={() => {}}
      />
    );

    const taxIdInput = screen.getByLabelText(
      "Податковий номер"
    ) as HTMLInputElement;
    expect(taxIdInput.value).toBe("1234567890");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} onClose={() => {}} />);

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

    await waitFor(() => {
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

  it("disables submit button when submitting", async () => {
    const slowOnSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    render(<EmployeeForm onSubmit={slowOnSubmit} onClose={() => {}} />);

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

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
