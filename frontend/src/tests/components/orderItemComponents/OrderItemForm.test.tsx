import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderItemForm from "../../../components/orderItemComponents/OrderItemForm";
import { useOrders } from "../../../hooks/useOrders";
import { OrderItemInterface } from "../../../types/orderItem";
import { OrderInterface } from "../../../types/order";
import { useEmployees } from "../../../hooks/useEmployees";
import { EmployeeInterface } from "../../../types/employee";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";
import { useFieldDefinitions } from "../../../hooks/useFieldDefinitions";

vi.mock("../../../hooks/useOrders", () => ({
  useOrders: vi.fn(),
}));

vi.mock("../../../hooks/useEmployees", () => ({
  useEmployees: vi.fn(),
}));

vi.mock("../../../hooks/useFieldDefinitions", () => ({
  useFieldDefinitions: vi.fn(),
}));

vi.mock("../../../hooks/useOrderItems", () => ({
  useOrderItems: vi.fn(),
}));

vi.mock("../../../components/EmployeeSelector", () => ({
  default: ({ value, onChange, label, error, helperText }: any) => (
    <div data-testid="employee-selector">
      <label>{label}</label>
      <input
        data-testid="employee-input"
        value={value}
        readOnly
        placeholder="Оберіть співробітника..."
      />
      <button
        data-testid="employee-select-button"
        onClick={() => {
          // Симулюємо вибір співробітника
          onChange(1, "John Doe");
        }}
      >
        Вибрати співробітника
      </button>
      {error && <div data-testid="employee-error">{helperText}</div>}
    </div>
  ),
}));


describe("OrderItemForm", () => {
  const mockEmployees: EmployeeInterface[] = [
    {
      id: 1,
      taxId: "1111111111",
      passportNumber: "1111111111",
      passportIssueDate: "2025-01-01",
      passportIssuedBy: "John Doe",
      fullName: "John Doe",
      personnelNumber: "001",
    },
    {
      id: 2,
      taxId: "2222222222",
      passportNumber: "2222222222",
      passportIssueDate: "2025-01-01",
      passportIssuedBy: "Jane Doe",
      fullName: "Jane Doe",
      personnelNumber: "002",
    },
  ];
  const mockFieldDefinitions: FieldDefinitionInterface[] = [
    {
      id: 1,
      fieldName: "Field A",
      fieldType: "text",
      orderIndex: 1,
      referenceSourceId: null,
      referenceSourceName: null,
    },
    {
      id: 2,
      fieldName: "Field B",
      fieldType: "text",
      orderIndex: 2,
      referenceSourceId: null,
      referenceSourceName: null,
    },
  ];
  const mockOrders: OrderInterface[] = [
    {
      id: 1,
      orderNumber: "ORD-1",
      orderDate: "2025-01-01",
      orderTypeId: 1,
      orderTypeName: "Type A",
    },
    {
      id: 2,
      orderNumber: "ORD-2",
      orderDate: "2025-01-02",
      orderTypeId: 2,
      orderTypeName: "Type B",
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
    (useOrders as any).mockReturnValue({
      data: mockOrders,
    });
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
    });
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
    });
  });

  it("renders all fields with default values", () => {
    render(<OrderItemForm {...defaultProps} />);

    expect(screen.getByLabelText("Наказ")).toBeInTheDocument();
    expect(screen.getByTestId("employee-selector")).toBeInTheDocument();
    expect(screen.getByLabelText("Поле")).toBeInTheDocument();
    expect(screen.getByLabelText("Значення")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders options in select fields", async () => {
    render(<OrderItemForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Наказ"));
    expect(screen.getByText("№ ORD-1 від 2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("№ ORD-2 від 2025-01-02")).toBeInTheDocument();
    
    expect(screen.getByTestId("employee-selector")).toBeInTheDocument();
  });

  it("renders with initial values when provided", async () => {
    const initialValues: OrderItemInterface = {
      id: 1,
      orderId: 1,
      employeeId: 1,
      fieldId: 1,
      value: "Some value",
      valueId: 0,
      orderNumber: "ORD-1",
      orderDate: "2025-01-01",
      employeeFullName: "John Doe",
      fieldDefinitionName: "Field A",
    };

    render(
      <OrderItemForm {...defaultProps} initialValues={initialValues} />
    );

    const valueInput = screen.getByRole("textbox", { name: "Field A" }) as HTMLInputElement;
    const employeeInput = screen.getByTestId("employee-input") as HTMLInputElement;

    await waitFor(() => {
      expect(valueInput.value).toBe("Some value");
      expect(employeeInput.value).toBe("John Doe");
    });
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<OrderItemForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Наказ"));
    await userEvent.click(screen.getByText("№ ORD-1 від 2025-01-01"));
    
    await userEvent.click(screen.getByTestId("employee-select-button"));
    
    await userEvent.click(screen.getByLabelText("Поле"));
    await userEvent.click(screen.getByText("Field A"));
    fireEvent.change(screen.getByRole("textbox", { name: "Field A" }), {
      target: { value: "Test 2" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderId: 1,
          employeeId: 1,
          fieldId: 1,
          value: "Test 2",
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
    render(<OrderItemForm {...defaultProps} onSubmit={slowOnSubmit} />);

    await userEvent.click(screen.getByLabelText("Наказ"));
    await userEvent.click(screen.getByText("№ ORD-1 від 2025-01-01"));
    
    await userEvent.click(screen.getByTestId("employee-select-button"));
    
    await userEvent.click(screen.getByLabelText("Поле"));
    await userEvent.click(screen.getByText("Field A"));
    fireEvent.change(screen.getByRole("textbox", { name: "Field A" }), {
      target: { value: "Test 3" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<OrderItemForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it("shows validation errors on submit with invalid data", async () => {
    render(<OrderItemForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      const errors = screen.getAllByText("Обов'язкове поле");
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
