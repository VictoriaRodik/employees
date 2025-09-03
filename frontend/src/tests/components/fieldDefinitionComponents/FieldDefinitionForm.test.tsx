import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FieldDefinitionForm from "../../../components/fieldDefinitionComponents/FieldDefinitionForm";
import { useReferenceSources } from "../../../hooks/useReferenceSources";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";
import { ReferenceSourceInterface } from "../../../types/referenceSource";

vi.mock("../../../hooks/useReferenceSources", () => ({
  useReferenceSources: vi.fn(),
}));

vi.mock("../../../hooks/useFieldDefinitions", () => ({
  useFieldDefinitions: vi.fn(),
}));


describe("FieldDefinitionForm", () => {
  const mockReferenceSources: ReferenceSourceInterface[] = [
    {
      id: 1,
      tableName: "Table 1",
    },
    {
      id: 2,
      tableName: "Table 2",
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
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
    });
  });

  it("renders all fields with default values", () => {
    render(<FieldDefinitionForm {...defaultProps} />);

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByLabelText("Тип")).toBeInTheDocument();
    expect(screen.getByLabelText("Індекс")).toBeInTheDocument();
    expect(screen.getByLabelText("Посилання на таблицю")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders options in select fields", async () => {
    render(<FieldDefinitionForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Посилання на таблицю"));
    expect(screen.getByText("Table 1")).toBeInTheDocument();
    expect(screen.getByText("Table 2")).toBeInTheDocument();
  });

  it("renders with initial values when provided", async () => {
    const initialValues: FieldDefinitionInterface = {
      id: 1,
      referenceSourceId: 1,
      fieldName: "Test field",
      fieldType: "text",
      orderIndex: 1,
      referenceSourceName: "Table 1",
    };

    render(
      <FieldDefinitionForm {...defaultProps} initialValues={initialValues} />
    );

    const fieldDefinitionNameInput = screen.getByLabelText(
      "Назва"
    ) as HTMLInputElement;

    await waitFor(() => {
      const hiddenInput = screen.getAllByDisplayValue("Test field")[0];
      expect(hiddenInput).toHaveAttribute("name", "fieldName");
      expect(fieldDefinitionNameInput.value).toBe("Test field");
    });
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<FieldDefinitionForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "Test 2" },
    });

    fireEvent.change(screen.getByLabelText("Тип"), {
      target: { value: "number" },
    });
    fireEvent.change(screen.getByLabelText("Індекс"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          fieldName: "Test 2",
          fieldType: "number",
          orderIndex: 2,
          referenceSourceId: 0,
          referenceSourceName: "",
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
    render(<FieldDefinitionForm {...defaultProps} onSubmit={slowOnSubmit} />);

    fireEvent.change(screen.getByLabelText("Назва"), {
      target: { value: "Test 3" },
    });

    fireEvent.change(screen.getByLabelText("Тип"), {
      target: { value: "number" },
    });
    fireEvent.change(screen.getByLabelText("Індекс"), {
      target: { value: "3" },
    });

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<FieldDefinitionForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it("shows validation errors on submit with invalid data", async () => {
    render(<FieldDefinitionForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      const errors = screen.getAllByText("Обов'язкове поле");
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
