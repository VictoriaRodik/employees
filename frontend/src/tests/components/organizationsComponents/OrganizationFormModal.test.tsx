import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrganizationFormModal from "../../../components/organizationComponents/OrganizationFormModal";
import { OrganizationInterface } from "../../../types/organization";

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

describe("OrganizationFormModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  it("renders Modal with correct props when open", () => {
    render(<OrganizationFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<OrganizationFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders OrganizationForm with passed props", () => {
    const initialValues: OrganizationInterface = {
      id: 1,
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
    };

    render(
      <OrganizationFormModal {...defaultProps} initialValues={initialValues} />
    );

    const taxIdInput = screen.getByLabelText(
      "ЄДРПОУ"
    ) as HTMLInputElement;
    expect(taxIdInput.value).toBe("32228978");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("passes onSubmit to OrganizationForm and calls it with valid data", async () => {
    render(<OrganizationFormModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("ЄДРПОУ"), {
      target: { value: "32222222" },
    });
    fireEvent.change(screen.getByLabelText("Назва організації"), {
      target: { value: "Test company" },
    });
    fireEvent.change(screen.getByLabelText("Скорочена назва"), {
      target: { value: "Company" },
    });
    fireEvent.change(screen.getByLabelText("Адреса"), {
      target: { value: "Some street" },
    });
    fireEvent.change(screen.getByLabelText("Телефон"), {
      target: { value: "0362" },
    });
    fireEvent.change(screen.getByLabelText("Розрахунковий рахунок"), {
      target: { value: "UA112222220000000000000000000" },
    });

    fireEvent.change(screen.getByLabelText("Банк"), {
      target: { value: "Big Bank" },
    });
    fireEvent.change(screen.getByLabelText("Установчий документ"), {
      target: { value: "Document" },
    });

    fireEvent.change(screen.getByLabelText("Посада керівника"), {
      target: { value: "director" },
    });

    fireEvent.change(screen.getByLabelText("ПІБ керівника"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test company",
          shortName: "Company",
          edrpouCode: "32222222",
          legalAddress: "Some street",
          phone: "0362",
          bankAccount: "UA112222220000000000000000000",
          bankName: "Big Bank",
          foundationDoc: "Document",
          directorPosition: "director",
          directorFullName: "John Doe",
        }),
        expect.any(Object)
      );
    });
  });
});
