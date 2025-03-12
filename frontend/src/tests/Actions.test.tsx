import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import Actions from "../components/Actions";

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

describe("Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Actions component with edit, copy and delete icons", () => {
    render(<Actions onEdit={() => {}} onCopy={() => {}} onDelete={() => {}} />);
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-button").length).toBe(3);
  });

  it("should call the onEdit function when the Edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<Actions onEdit={onEdit} onCopy={() => {}} onDelete={() => {}} />);
    const editButton = screen.getAllByTestId("icon-button")[0];
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("should call the onCopy function when the Copy button is clicked", () => {
    const onCopy = vi.fn();
    render(<Actions onEdit={() => {}} onCopy={onCopy} onDelete={() => {}} />);
    const copyButton = screen.getAllByTestId("icon-button")[1];
    fireEvent.click(copyButton);
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it("should call the onDelete function when the Delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<Actions onEdit={() => {}} onCopy={() => {}} onDelete={onDelete} />);
    const deleteButton = screen.getAllByTestId("icon-button")[2];
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
