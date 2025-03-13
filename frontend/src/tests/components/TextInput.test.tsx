import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Formik, Form } from "formik";
import TextInput from "../../components/TextInput";

const renderWithFormik = (
  ui: React.ReactElement,
  initialValues = {},
  initialTouched = {}
) => {
  return render(
    <Formik
      initialValues={initialValues}
      initialTouched={initialTouched}
      onSubmit={vi.fn()}
    >
      <Form>{ui}</Form>
    </Formik>
  );
};

describe("TextInput", () => {
  it("renders with default props", () => {
    renderWithFormik(<TextInput name="test" label="Test Label" />, {
      test: "",
    });

    const input = screen.getByLabelText("Test Label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).not.toHaveAttribute("multiline");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toHaveStyle("width: 100%");
  });

  it("renders with custom type", () => {
    renderWithFormik(
      <TextInput name="password" label="Password" type="password" />,
      { password: "" }
    );

    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders as multiline with rows", () => {
    renderWithFormik(
      <TextInput name="description" label="Description" multiline rows={4} />,
      { description: "" }
    );

    const textarea = screen.getByLabelText("Description");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it('displays error and helper text when touched and invalid', async () => {
    const initialValues = { email: 'invalid' };
    const initialTouched = { email: true };
    const validate = (values: { email: string }) => {
      const errors: { email?: string } = {};
      if (!values.email.includes('@')) errors.email = 'Invalid email';
      return errors;
    };

    render(
      <Formik
        initialValues={initialValues}
        initialTouched={initialTouched}
        validate={validate}
        validateOnMount={true}
        onSubmit={vi.fn()}
      >
        <Form>
          <TextInput name="email" label="Email" />
        </Form>
      </Formik>
    );

    const input = screen.getByLabelText('Email');
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it("does not show error when not touched", () => {
    const initialValues = { email: "invalid" };
    const validate = (values: { email: string }) => {
      const errors: { email?: string } = {};
      if (!values.email.includes("@")) errors.email = "Invalid email";
      return errors;
    };

    render(
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={vi.fn()}
      >
        <Form>
          <TextInput name="email" label="Email" />
        </Form>
      </Formik>
    );

    const input = screen.getByLabelText("Email");
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });

  it("updates value through Formik", () => {
    renderWithFormik(<TextInput name="username" label="Username" />, {
      username: "john",
    });

    const input = screen.getByLabelText("Username") as HTMLInputElement;
    expect(input.value).toBe("john");
  });
});
