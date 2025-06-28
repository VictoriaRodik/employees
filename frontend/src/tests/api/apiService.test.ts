import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchAll,
  addItem,
  updateItem,
  deleteItem,
} from "../../api/apiService";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("API Functions", () => {
  const mockData = [
    {
      id: 1,
      taxId: "1234567890",
      fullName: "John Doe",
      address: "123 Main St",
      passportSeries: "СР",
      passportNumber: "123456",
      passportIssueDate: "2023-01-01",
      passportIssuedBy: "5600",
      personnelNumber: "001",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("fetchData", () => {
    it("should fetch data successfully", async () => {
      (axios.get as any).mockResolvedValue({ data: mockData });

      const result = await fetchAll("data");

      expect(axios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/data`
      );
      expect(result).toEqual(mockData);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("taxId");
      expect(result[0]).toHaveProperty("fullName");
    });

    it("should throw error on fetch failure", async () => {
      const error = new Error("Network error");
      (axios.get as any).mockRejectedValue(error);

      await expect(fetchAll("data")).rejects.toThrow("Network error");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("addItem", () => {
    it("should add an data successfully", async () => {
      const newData = { ...mockData[0], id: 0 };
      const createdData = { ...newData, id: 2 };
      (axios.post as any).mockResolvedValue({ data: createdData });

      const result = await addItem("data", newData);

      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/data`,
        newData
      );
      expect(result).toEqual(createdData);
      expect(result.taxId).toBe(newData.taxId);
      expect(result.fullName).toBe(newData.fullName);
      expect(result.id).toBeDefined();
    });

    it("should throw error on add failure", async () => {
      const error = new Error("Bad request");
      (axios.post as any).mockRejectedValue(error);

      await expect(addItem("data", mockData)).rejects.toThrow("Bad request");
      expect(console.error).toHaveBeenCalledWith(
        "Error adding to data:",
        error
      );
    });
  });

  describe("updateItem", () => {
    it("should update an data successfully", async () => {
      const updatedData = { ...mockData[0], fullName: "John Updated" };
      (axios.put as any).mockResolvedValue({ data: updatedData });

      const result = await updateItem("data", updatedData);

      expect(axios.put).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/data/${updatedData.id}`,
        updatedData
      );
      expect(result).toEqual(updatedData);
      expect(result.fullName).toBe("John Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axios.put as any).mockRejectedValue(error);

      await expect(updateItem("data", mockData[0])).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteItem", () => {
    it("should delete an data successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await deleteItem("data", mockData[0].id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/data/${mockData[0].id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(deleteItem("data", mockData[0].id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
