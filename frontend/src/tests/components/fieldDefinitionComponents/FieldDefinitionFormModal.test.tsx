import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FieldDefinitionFormModal from "../../../components/fieldDefinitionComponents/FieldDefinitionFormModal";
import { useReferenceSources } from "../../../hooks/useReferenceSources";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";
import { ReferenceSourceInterface } from "../../../types/referenceSource";

vi.mock("../../../hooks/useReferenceSources", () => ({
  useReferenceSources: vi.fn(),
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

describe("FieldDefinitionFormModal", () => {
  const mockReferenceSources: ReferenceSourceInterface[] = [
    {
      id: 1,
      tableName: "Employees",
    },
    {
      id: 2,
      tableName: "Contracts",
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
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
    });
  });

  it("renders Modal with correct props when open", () => {
    render(<FieldDefinitionFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<FieldDefinitionFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders FieldDefinitionForm with passed props", () => {
    const initialValues: FieldDefinitionInterface = {
      id: 1,
      fieldName: "Test field",
      fieldType: "reference",
      orderIndex: 1,
      referenceSourceId: 1,
      referenceSourceName: "Employees",
    };

    render(
      <FieldDefinitionFormModal
        {...defaultProps}
        initialValues={initialValues}
      />
    );

    const nameInput = screen.getByLabelText("Назва") as HTMLInputElement;
    expect(nameInput.value).toBe("Test field");
    const typeInput = screen.getByLabelText("Тип") as HTMLInputElement;
    expect(typeInput.value).toBe("reference");
    const orderIndexInput = screen.getByLabelText("Індекс") as HTMLInputElement;
    expect(orderIndexInput.value).toBe("1");
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Зберегти зміни")).toBeInTheDocument();
  });

  it("passes onSubmit to FieldDefinitionForm and calls it with valid data", async () => {
    render(<FieldDefinitionFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "Test field new" },
    });
    fireEvent.change(screen.getByLabelText("Тип"), {
      target: { value: "reference" },
    });
    fireEvent.change(screen.getByLabelText("Індекс"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          fieldName: "Test field new",
          fieldType: "reference",
          orderIndex: 10,
          referenceSourceId: 0,
          referenceSourceName: "",
        }),

        expect.any(Object)
      );
    });
  });
});
