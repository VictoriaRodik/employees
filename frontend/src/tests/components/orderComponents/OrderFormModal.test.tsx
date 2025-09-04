import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderFormModal from "../../../components/orderComponents/OrderFormModal";
import { useOrderTypes } from "../../../hooks/useOrderTypes";
import { useOrganizations } from "../../../hooks/useOrganizations";
import { OrderInterface } from "../../../types/order";
import { OrderTypeInterface } from "../../../types/orderType";
import { OrganizationInterface } from "../../../types/organization";

vi.mock("../../../hooks/useOrderTypes", () => ({
  useOrderTypes: vi.fn(),
}));

vi.mock("../../../hooks/useOrganizations", () => ({
  useOrganizations: vi.fn(),
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

describe("OrderFormModal", () => {
  const mockOrderTypes: OrderTypeInterface[] = [
    { id: 1, orderTypeName: "Type A" },
    { id: 2, orderTypeName: "Type B" },
  ];

  const mockOrganizations: OrganizationInterface[] = [
    {
      id: 10,
      name: "Test company",
      shortName: "Company",
      edrpouCode: "32228978",
      legalAddress: "Some street",
      phone: "0362",
      bankAccount: "UA112222220000000000000000000",
      bankName: "Big Bank",
      foundationDoc: "Document",
      directorPosition: "director",
      directorFullName: "John Doe",
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
    (useOrderTypes as any).mockReturnValue({ data: mockOrderTypes });
    (useOrganizations as any).mockReturnValue({ data: mockOrganizations });
  });

  it("renders Modal with correct props when open", () => {
    render(<OrderFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
  });

  it("does not render Modal content when closed", () => {
    render(<OrderFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders OrderForm with passed props", () => {
    const initialValues: OrderInterface = {
      id: 1,
      orderDate: "2025-01-01",
      orderNumber: "01-01",
      orderTypeId: 1,
      orderTypeName: "Type A",
    };

    render(
      <OrderFormModal {...defaultProps} initialValues={initialValues} />
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveTextContent("Type A");
    const dateInput = screen.getByLabelText("Дата") as HTMLInputElement;
    expect(dateInput.value).toBe("2025-01-01");
    expect(screen.getByText("Зберегти зміни")).toBeInTheDocument();
  });

  it("passes onSubmit to OrderForm and calls it with valid data", async () => {
    render(<OrderFormModal {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Тип"));
    const listbox = await screen.findByRole("listbox");
    await userEvent.click(within(listbox).getByRole("option", { name: "Type A" }));

    fireEvent.change(screen.getByLabelText("Дата"), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Номер"), {
      target: { value: "01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          orderDate: "2025-01-01",
          orderNumber: "01-01",
          orderTypeId: 1,
        }),
        expect.any(Object)
      );
    });
  });
});
