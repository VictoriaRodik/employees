import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ConfirmDialog from "../../components/ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaultText =
    "Ви дійсно бажаєте видалити цей запис? Цю дію не можна буде скасувати.";

  it("renders when open is true", () => {
    render(
      <ConfirmDialog open={true} onClose={() => {}} onConfirm={() => {}} />
    );
    expect(screen.getByText(defaultText)).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    const { queryByText } = render(
      <ConfirmDialog open={false} onClose={() => {}} onConfirm={() => {}} />
    );
    expect(queryByText(defaultText)).not.toBeInTheDocument();
  });

  it("renders with custom description", () => {
    const customText = "Видалити співробітника?";
    render(
      <ConfirmDialog
        open={true}
        onClose={() => {}}
        onConfirm={() => {}}
        description={customText}
      />
    );
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it("calls onConfirm when 'Так' button is clicked", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog open={true} onClose={() => {}} onConfirm={onConfirm} />
    );
    fireEvent.click(screen.getByText("Так"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when 'Ні' button is clicked", () => {
    const onClose = vi.fn();
    render(
      <ConfirmDialog open={true} onClose={onClose} onConfirm={() => {}} />
    );
    fireEvent.click(screen.getByText("Ні"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
