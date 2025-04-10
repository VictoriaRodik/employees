import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchOrganizations,
  addOrganization,
  updateOrganization,
  deleteOrganization,
} from "../../api/organizations";
import { OrganizationInterface } from "../../types/organization";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Organization API Functions", () => {
  const mockOrganization: OrganizationInterface = {
    id: 1,
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

  describe("fetchOrganizations", () => {
    it("should fetch organizations successfully", async () => {
      const mockOrganizations = [mockOrganization];
      (axios.get as any).mockResolvedValue({ data: mockOrganizations });

      const result = await fetchOrganizations();

      expect(axios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/organizations`
      );
      expect(result).toEqual(mockOrganizations);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("edrpouCode");
    });

    it("should throw error on fetch failure", async () => {
      const error = new Error("Network error");
      (axios.get as any).mockRejectedValue(error);

      await expect(fetchOrganizations()).rejects.toThrow("Network error");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("addOrganization", () => {
    it("should add an organization successfully", async () => {
      const newOrganization = { ...mockOrganization, id: 0 };
      const createdOrganization = { ...newOrganization, id: 2 };
      (axios.post as any).mockResolvedValue({ data: createdOrganization });

      const result = await addOrganization(newOrganization);

      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/organizations`,
        newOrganization
      );
      expect(result).toEqual(createdOrganization);
      expect(result.name).toBe(newOrganization.name);
      expect(result.edrpouCode).toBe(newOrganization.edrpouCode);
      expect(result.id).toBeDefined();
    });

    it("should throw error on add failure", async () => {
      const error = new Error("Bad request");
      (axios.post as any).mockRejectedValue(error);

      await expect(addOrganization(mockOrganization)).rejects.toThrow("Bad request");
      expect(console.error).toHaveBeenCalledWith(
        "Error adding organization:",
        error
      );
    });
  });

  describe("updateOrganization", () => {
    it("should update an organization successfully", async () => {
      const updatedOrganization = { ...mockOrganization, name: "Company Updated" };
      (axios.put as any).mockResolvedValue({ data: updatedOrganization });

      const result = await updateOrganization(updatedOrganization);

      expect(axios.put).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/organizations/${updatedOrganization.id}`,
        updatedOrganization
      );
      expect(result).toEqual(updatedOrganization);
      expect(result.name).toBe("Company Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axios.put as any).mockRejectedValue(error);

      await expect(updateOrganization(mockOrganization)).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteOrganization", () => {
    it("should delete an organization successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await deleteOrganization(mockOrganization.id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/organizations/${mockOrganization.id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(deleteOrganization(mockOrganization.id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
