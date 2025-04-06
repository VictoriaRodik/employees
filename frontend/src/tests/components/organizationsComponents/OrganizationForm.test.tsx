import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import OrganizationForm from "../../../components/organizationComponents/OrganizationForm";
import { OrganizationInterface } from "../../../types/organization";

describe("OrganizationForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields with default values", () => {
    render(<OrganizationForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    expect(screen.getByLabelText("Назва організації")).toBeInTheDocument();
    expect(screen.getByLabelText("Скорочена назва")).toBeInTheDocument();
    expect(screen.getByLabelText("ЄДРПОУ")).toBeInTheDocument();
    expect(screen.getByLabelText("Адреса")).toBeInTheDocument();
    expect(screen.getByLabelText("Телефон")).toBeInTheDocument();
    expect(screen.getByLabelText("Розрахунковий рахунок")).toBeInTheDocument();
    expect(screen.getByLabelText("Банк")).toBeInTheDocument();
    expect(screen.getByLabelText("Установчий документ")).toBeInTheDocument();
    expect(screen.getByLabelText("Посада керівника")).toBeInTheDocument();
    expect(screen.getByLabelText("ПІБ керівника")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Додати" })).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    const initialValues: OrganizationInterface = {
      id: 0,
      name: "Test company",
      shortName: "Company",
      edrpouCode: "32228978",
      address: "Some street",
      phone: "0362",
      bankAccount: "UA112222220000000000000000000",
      bankName: "Big Bank",
      foundationDoc: "Document",
      directorPosition: "director",
      directorFullName: "John Doe",
    };

    render(
      <OrganizationForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        onClose={() => {}}
      />
    );

    const edrpouCode = screen.getByLabelText("ЄДРПОУ") as HTMLInputElement;
    expect(edrpouCode.value).toBe("32228978");
    expect(
      screen.getByRole("button", { name: "Зберегти зміни" })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<OrganizationForm onSubmit={mockOnSubmit} onClose={() => {}} />);

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
          address: "Some street",
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

  it("disables submit button when submitting", async () => {
    const slowOnSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    render(<OrganizationForm onSubmit={slowOnSubmit} onClose={() => {}} />);

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

    const submitButton = screen.getByRole("button", { name: "Додати" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), {
      timeout: 200,
    });
  });

  it("does not call onSubmit with invalid data", async () => {
    render(<OrganizationForm onSubmit={mockOnSubmit} onClose={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(
      () => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
