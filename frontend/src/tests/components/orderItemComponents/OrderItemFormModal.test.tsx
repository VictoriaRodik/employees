import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderItemFormModal from "../../../components/orderItemComponents/OrderItemFormModal";
import { useOrders } from "../../../hooks/useOrders";
import { OrderItemInterface } from "../../../types/orderItem";
import { OrderInterface } from "../../../types/order";
import { useEmployees } from "../../../hooks/useEmployees";
import { useFieldDefinitions } from "../../../hooks/useFieldDefinitions";
import { EmployeeInterface } from "../../../types/employee";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";


vi.mock("../../../hooks/useOrders", () => ({
  useOrders: vi.fn(),
}));
vi.mock("../../../hooks/useEmployees", () => ({
  useEmployees: vi.fn(),
}));

vi.mock("../../../hooks/useFieldDefinitions", () => ({
  useFieldDefinitions: vi.fn(),
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

describe("OrderItemFormModal", () => {
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

  it("renders Modal with correct props when open", () => {
    render(<OrderItemFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
  });

  it("does not render Modal content when closed", () => {
    render(<OrderItemFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders OrderItemForm with passed props", () => {
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
      <OrderItemFormModal
        {...defaultProps}
        initialValues={initialValues}
      />
    );

    expect(screen.getAllByRole("combobox")).toHaveLength(3);
    const valueInput = screen.getByRole("textbox", { name: "Field A" }) as HTMLInputElement;
    expect(valueInput.value).toBe("Some value");
    expect(screen.getByText("Зберегти зміни")).toBeInTheDocument();
  });

  it("passes onSubmit to OrderItemForm and calls it with valid data", async () => {
    render(<OrderItemFormModal {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Наказ"));
    await userEvent.click(screen.getByText("№ ORD-1 від 2025-01-01"));
    await userEvent.click(screen.getByLabelText("Співробітник"));
    await userEvent.click(screen.getByText("John Doe (001)"));
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
});
