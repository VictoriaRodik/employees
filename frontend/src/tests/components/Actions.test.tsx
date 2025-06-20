import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import Actions from "../../components/Actions";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    IconButton: vi.fn(({ children, onClick }) => (
      <button data-testid="icon-button" onClick={onClick}>
        {children}
      </button>
    )),
    Dialog: vi.fn(({ open, onClose, children }) => (
      <div
        data-testid="dialog"
        style={{ display: open ? "block" : "none" }}
        onClick={onClose}
      >
        {children}
      </div>
    )),
  };
});

vi.mock("@mui/icons-material/MoreHorizIcon", () => ({
  default: () => <span data-testid="edit-icon" />,
}));

vi.mock("../../components/ActionButtons", () => ({
  default: vi.fn(() => (
    <div data-testid="action-buttons">
      <span data-testid="edit-icon">Edit</span>
      <span data-testid="copy-icon">Copy</span>
      <span data-testid="delete-icon">Delete</span>
    </div>
  )),
}));

describe("Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Actions component with edit, copy and delete icons", () => {
    render(<Actions onEdit={() => {}} onCopy={() => {}} onDelete={() => {}} />);
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-button").length).toBe(1);
  });
  it("should open the dialog when the MoreHorizIcon button is clicked", () => {
    render(<Actions onEdit={() => {}} onCopy={() => {}} onDelete={() => {}} />);
    const moreButton = screen.getByTestId("icon-button");
    fireEvent.click(moreButton);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });
});
