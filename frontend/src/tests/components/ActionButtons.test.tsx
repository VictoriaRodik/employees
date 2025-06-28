import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import ActionButtons from "../../components/ActionButtons";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    IconButton: vi.fn(({ children, onClick }) => (
      <button data-testid="icon-button" onClick={onClick}>
        {children}
      </button>
    )),
  };
});

vi.mock("@mui/icons-material/EditOutlined", () => ({
  default: () => <span data-testid="edit-icon" />,
}));

vi.mock("@mui/icons-material/ContentCopyOutlined", () => ({
  default: () => <span data-testid="copy-icon" />,
}));

vi.mock("@mui/icons-material/DeleteOutlined", () => ({
  default: () => <span data-testid="delete-icon" />,
}));

vi.mock("../../components/ConfirmDialog", () => ({
  default: ({ open, onConfirm, onClose, description }: any) =>
    open ? (
      <div data-testid="confirm-dialog">
        <p>{description}</p>
        <button onClick={onConfirm} data-testid="confirm-yes">
          Так
        </button>
        <button onClick={onClose} data-testid="confirm-no">
          Ні
        </button>
      </div>
    ) : null,
}));

describe("ActionButtons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the ActionButtons component with edit, copy and delete icons", () => {
    render(
      <ActionButtons onEdit={() => {}} onCopy={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-button").length).toBe(3);
  });

  it("should call the onEdit function when the Edit button is clicked", () => {
    const onEdit = vi.fn();
    render(
      <ActionButtons onEdit={onEdit} onCopy={() => {}} onDelete={() => {}} />
    );
    const editButton = screen.getAllByTestId("icon-button")[0];
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("should call the onCopy function when the Copy button is clicked", () => {
    const onCopy = vi.fn();
    render(
      <ActionButtons onEdit={() => {}} onCopy={onCopy} onDelete={() => {}} />
    );
    const copyButton = screen.getAllByTestId("icon-button")[1];
    fireEvent.click(copyButton);
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when confirmed in dialog", () => {
    const onDelete = vi.fn();
    render(
      <ActionButtons onEdit={() => {}} onCopy={() => {}} onDelete={onDelete} />
    );
    fireEvent.click(screen.getAllByTestId("icon-button")[2]);
    fireEvent.click(screen.getByTestId("confirm-yes"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("should not call onDelete when cancel is clicked", () => {
    const onDelete = vi.fn();
    render(
      <ActionButtons onEdit={() => {}} onCopy={() => {}} onDelete={onDelete} />
    );
    fireEvent.click(screen.getAllByTestId("icon-button")[2]);
    fireEvent.click(screen.getByTestId("confirm-no"));
    expect(onDelete).not.toHaveBeenCalled();
  });
});
