import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import FieldDefinitionForm from "../../../components/fieldDefinitionComponents/FieldDefinitionForm";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";

vi.mock("../../../hooks/useReferenceSources", () => ({
  useReferenceSources: () => ({
    data: [
      { id: 1, tableName: "Test Table 1" },
      { id: 2, tableName: "Test Table 2" },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock("../../../components/TextInput", () => ({
  default: ({ name, label }: any) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} data-testid={name} />
    </div>
  ),
}));

vi.mock("@mui/material", () => ({
  Grid2: ({ children }: any) => <div data-testid="grid">{children}</div>,
  Button: ({ children, type, disabled }: any) => (
    <button type={type} disabled={disabled} data-testid="submit-button">
      {children}
    </button>
  ),
  TextField: ({ name, label, value, onChange, children }: any) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        data-testid={name}
      >
        {children}
      </select>
    </div>
  ),
  MenuItem: ({ children, value }: any) => (
    <option value={value}>{children}</option>
  ),
}));

describe("FieldDefinitionForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields with default values", () => {
    render(<FieldDefinitionForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByLabelText("Тип")).toBeInTheDocument();
    expect(screen.getByLabelText("Індекс")).toBeInTheDocument();
    expect(screen.getByLabelText("Посилання на таблицю")).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    const initialValues: FieldDefinitionInterface = {
      id: 1,
      fieldName: "Some fieldDefinition",
      fieldType: "text",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null,
    };

    render(
      <FieldDefinitionForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        onClose={() => {}}
      />
    );

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByLabelText("Тип")).toBeInTheDocument();
    expect(screen.getByLabelText("Індекс")).toBeInTheDocument();
    expect(screen.getByLabelText("Посилання на таблицю")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<FieldDefinitionForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    const nameInput = screen.getByTestId("fieldName");
    fireEvent.change(nameInput, {
      target: { value: "Test Field" },
    });
    const typeInput = screen.getByTestId("fieldType");
    fireEvent.change(typeInput, {
      target: { value: "text" },
    });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          fieldName: "Test Field",
          fieldType: "text",
        }),
        expect.any(Object)
      );
    });
  });

  it("disables submit button when submitting", async () => {
    const slowOnSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 200))
      );

    render(<FieldDefinitionForm onSubmit={slowOnSubmit} onClose={() => {}} />);

    const nameInput = screen.getByTestId("fieldName");
    fireEvent.change(nameInput, {
      target: { value: "Test Field" },
    });
    const typeInput = screen.getByTestId("fieldType");
    fireEvent.change(typeInput, {
      target: { value: "text" },
    });

    const submitButton = screen.getByRole("button", { name: /додати/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 300,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<FieldDefinitionForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
