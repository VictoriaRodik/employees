import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal"; // Adjust path as needed

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  const mockDialog = vi.fn(({ open, onClose, children }) =>
    open ? (
      <div data-testid="dialog" onClick={onClose}>
        {children}
      </div>
    ) : null
  );
  return {
    ...actual,
    Dialog: mockDialog,
    DialogTitle: vi.fn(({ children }) => (
      <h2 data-testid="dialog-title">{children}</h2>
    )),
    DialogContent: vi.fn(({ children }) => (
      <div data-testid="dialog-content">{children}</div>
    )),
    DialogActions: vi.fn(({ children }) => (
      <div data-testid="dialog-actions">{children}</div>
    )),
  };
});

describe("Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when open is false", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("renders modal with title and content when open is true", () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toHaveTextContent("Test Modal");
    expect(screen.getByTestId("dialog-content")).toHaveTextContent(
      "Modal Content"
    );
    expect(screen.queryByTestId("dialog-actions")).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = <button>Save</button>;
    render(
      <Modal
        open={true}
        onClose={() => {}}
        title="Test Modal"
        actions={actions}
      >
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toHaveTextContent("Test Modal");
    expect(screen.getByTestId("dialog-content")).toHaveTextContent(
      "Modal Content"
    );
    expect(screen.getByTestId("dialog-actions")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls onClose when the dialog is clicked", () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByTestId("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
