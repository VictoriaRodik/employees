import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchContracts,
  addContract,
  editContract,
  removeContract,
} from "../../api/contracts";
import { ApiContract } from "../../types/contract";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Contract API Functions", () => {
  const mockContract: ApiContract = {
    id: 1,
    contract_date: "2025-01-01",
    contract_end_date: "2025-01-01",
    contract_amount: "1000",
    contract_content: "test",
    contract_number: "01-01",
    employee_id: "1",
    tax_id: "1234567890",
    full_name: "John Doe",
    address: "123 Main St",
    passport_series: "AB",
    passport_number: "123456",
    passport_issue_date: "2023-01-01",
    passport_issued_by: "5600",
    organization_id: "10",
    name: "Test company",
    short_name: "Company",
    edrpou_code: "32228978",
    legal_address: "Some street",
    phone: "0362",
    bank_account: "UA112222220000000000000000000",
    bank_name: "Big Bank",
    foundation_doc: "Document",
    director_position: "director",
    director_full_name: "John Doe",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("fetchContracts", () => {
    it("should fetch contracts successfully", async () => {
      const mockContracts = [mockContract];
      (axios.get as any).mockResolvedValue({ data: mockContracts });

      const result = await fetchContracts();

      expect(axios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/contracts`
      );
      expect(result).toEqual(mockContracts);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("contractDate");
      expect(result[0]).toHaveProperty("contractNumber");
    });

    it("should throw error on fetch failure", async () => {
      const error = new Error("Network error");
      (axios.get as any).mockRejectedValue(error);

      await expect(fetchContracts()).rejects.toThrow("Network error");
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching contracts:",
        error
      );
    });
  });

  describe("addContract", () => {
    it("should add a contract successfully", async () => {
      const newContract = { ...mockContract, id: 0 };
      const createdContract = { ...newContract, id: 2 };
      (axios.post as any).mockResolvedValue({ data: createdContract });

      const result = await addContract(newContract);

      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/contracts`,
        newContract
      );
      expect(result).toEqual(createdContract);
      expect(result.contract_date).toBe(newContract.contract_date);
      expect(result.contract_number).toBe(newContract.contract_number);
      expect(result.id).toBeDefined();
    });

    it("should throw error on add failure", async () => {
      const error = new Error("Bad request");
      (axios.post as any).mockRejectedValue(error);

      await expect(addContract(mockContract)).rejects.toThrow("Bad request");
      expect(console.error).toHaveBeenCalledWith(
        "Error adding to contracts:",
        error
      );
    });
  });

  describe("updateContract", () => {
    it("should update a contract successfully", async () => {
      const updatedContract = { ...mockContract, fullName: "John Updated" };
      (axios.put as any).mockResolvedValue({ data: updatedContract });

      const result = await editContract(updatedContract);

      expect(axios.put).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/contracts/${updatedContract.id}`,
        updatedContract
      );
      expect(result).toEqual(updatedContract);
      expect(result.full_name).toBe("John Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axios.put as any).mockRejectedValue(error);

      await expect(editContract(mockContract)).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalledWith(
        "Error updating contracts:",
        error
      );
    });
  });

  describe("deleteContract", () => {
    it("should delete a contract successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await removeContract(mockContract.id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/contracts/${mockContract.id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(removeContract(mockContract.id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error deleting from contracts:",
        error
      );
    });
  });
});
