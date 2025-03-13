import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import PrintActions from "../../components/PrintActions";

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

vi.mock("@mui/icons-material/AssignmentOutlined", () => ({
  default: () => <span data-testid="contract-icon" />,
}));

vi.mock("@mui/icons-material/ReceiptOutlined", () => ({
  default: () => <span data-testid="cash-icon" />,
}));


describe("PrintActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Actions component with contract and cash order icons", () => {
    render(<PrintActions onPreviewContract={() => {}} onPreviewCashOrder={() => {}} />);
    expect(screen.getByTestId("contract-icon")).toBeInTheDocument();
    expect(screen.getByTestId("cash-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-button").length).toBe(2);
  });

  it("should call the onPreviewContract function when the Contract button is clicked", () => {
    const onPreviewContract = vi.fn();
    render(<PrintActions onPreviewContract={onPreviewContract} onPreviewCashOrder={() => {}} />);
    const contractButton = screen.getAllByTestId("icon-button")[0];
    fireEvent.click(contractButton);
    expect(onPreviewContract).toHaveBeenCalledTimes(1);
  });

  it("should call the onPreviewCashOrder function when the Cah order button is clicked", () => {
    const onPreviewCashOrder = vi.fn();
    render(<PrintActions onPreviewCashOrder={onPreviewCashOrder} onPreviewContract={()=>{}} />);
    const cashButton = screen.getAllByTestId("icon-button")[1];
    fireEvent.click(cashButton);
    expect(onPreviewCashOrder).toHaveBeenCalledTimes(1);
  });
});
