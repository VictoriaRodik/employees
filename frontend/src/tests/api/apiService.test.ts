import { describe, expect, it, vi, beforeEach } from "vitest";
import axiosInstance from "../../api/axiosInstance";
import {
  fetchAll,
  addItem,
  updateItem,
  deleteItem,
} from "../../api/apiService";

vi.mock("../../api/axiosInstance", () => ({
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
      (axiosInstance.get as any).mockResolvedValue({ data: mockData });

      const result = await fetchAll("data");

      expect(axiosInstance.get).toHaveBeenCalledWith("/data");
      expect(result).toEqual(mockData);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("taxId");
      expect(result[0]).toHaveProperty("fullName");
    });

    it("should throw error on fetch failure", async () => {
      const error = new Error("Network error");
      (axiosInstance.get as any).mockRejectedValue(error);

      await expect(fetchAll("data")).rejects.toThrow("Network error");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("addItem", () => {
    it("should add an data successfully", async () => {
      const newData = { ...mockData[0], id: 0 };
      const createdData = { ...newData, id: 2 };
      (axiosInstance.post as any).mockResolvedValue({ data: createdData });

      const result = await addItem("data", newData);

      expect(axiosInstance.post).toHaveBeenCalledWith("/data", newData);
      expect(result).toEqual(createdData);
      expect(result.taxId).toBe(newData.taxId);
      expect(result.fullName).toBe(newData.fullName);
      expect(result.id).toBeDefined();
    });

    it("should throw error on add failure", async () => {
      const error = new Error("Bad request");
      (axiosInstance.post as any).mockRejectedValue(error);

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
      (axiosInstance.put as any).mockResolvedValue({ data: updatedData });

      const result = await updateItem("data", updatedData);

      expect(axiosInstance.put).toHaveBeenCalledWith(
        `/data/${updatedData.id}`,
        updatedData
      );
      expect(result).toEqual(updatedData);
      expect(result.fullName).toBe("John Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axiosInstance.put as any).mockRejectedValue(error);

      await expect(updateItem("data", mockData[0])).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteItem", () => {
    it("should delete an data successfully", async () => {
      (axiosInstance.delete as any).mockResolvedValue({});

      await deleteItem("data", mockData[0].id);

      expect(axiosInstance.delete).toHaveBeenCalledWith(
        `/data/${mockData[0].id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axiosInstance.delete as any).mockRejectedValue(error);

      await expect(deleteItem("data", mockData[0].id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
