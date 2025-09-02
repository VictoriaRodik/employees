import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FieldDefinitionFormModal from "../../../components/fieldDefinitionComponents/FieldDefinitionFormModal";
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
  Button: ({ children, onClick, disabled, type }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-testid="submit-button"
    >
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
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<FieldDefinitionFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
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
      fieldName: "Some fieldDefinition",
      fieldType: "number",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null,
    };

    render(
      <FieldDefinitionFormModal
        {...defaultProps}
        initialValues={initialValues}
      />
    );

    expect(screen.getByLabelText("Назва")).toBeInTheDocument();
    expect(screen.getByLabelText("Тип")).toBeInTheDocument();
    expect(screen.getByLabelText("Індекс")).toBeInTheDocument();
    expect(screen.getByLabelText("Посилання на таблицю")).toBeInTheDocument();
  });

  it("passes onSubmit to FieldDefinitionForm and calls it with valid data", async () => {
    render(<FieldDefinitionFormModal {...defaultProps} />);

    const nameInput = screen.getByTestId("fieldName");
    fireEvent.change(nameInput, {
      target: { value: "Test Field" },
    });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
