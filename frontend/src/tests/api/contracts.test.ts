import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchContracts,
  addContract,
  updateContract,
  deleteContract,
} from "../../api/contracts";
import { ContractInterface } from "../../types/contract";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Contract API Functions", () => {
  const mockContract: ContractInterface = {
    id: 1,
    contractDate: "2025-01-01",
    contractEndDate: "2025-01-01",
    contractAmount: "1000",
    contractContent: "test",
    contractNumber: "01-01",
    employeeId: "1",
    taxId: "1234567890",
    fullName: "John Doe",
    address: "123 Main St",
    passportSeries: "AB",
    passportNumber: "123456",
    passportIssueDate: "2023-01-01",
    passportIssuedBy: "5600",
    organizationId: "10",
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
      expect(result.contractDate).toBe(newContract.contractDate);
      expect(result.contractNumber).toBe(newContract.contractNumber);
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

      const result = await updateContract(updatedContract);

      expect(axios.put).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/contracts/${updatedContract.id}`,
        updatedContract
      );
      expect(result).toEqual(updatedContract);
      expect(result.fullName).toBe("John Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axios.put as any).mockRejectedValue(error);

      await expect(updateContract(mockContract)).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalledWith(
        "Error updating contracts:",
        error
      );
    });
  });

  describe("deleteContract", () => {
    it("should delete a contract successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await deleteContract(mockContract.id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/contracts/${mockContract.id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(deleteContract(mockContract.id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error deleting from contracts:",
        error
      );
    });
  });
});
