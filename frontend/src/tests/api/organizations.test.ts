import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchOrganizations,
  addOrganization,
  editOrganization,
  removeOrganization,
} from "../../api/organizations";
import { ApiOrganization } from "../../types/organization";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Organization API Functions", () => {
  const mockOrganization: ApiOrganization = {
    id: 1,
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
      expect(result.edrpou_code).toBe(newOrganization.edrpou_code);
      expect(result.id).toBeDefined();
    });

    it("should throw error on add failure", async () => {
      const error = new Error("Bad request");
      (axios.post as any).mockRejectedValue(error);

      await expect(addOrganization(mockOrganization)).rejects.toThrow("Bad request");
      expect(console.error).toHaveBeenCalledWith(
        "Error adding to organizations:",
        error
      );
    });
  });

  describe("updateOrganization", () => {
    it("should update an organization successfully", async () => {
      const updatedOrganization = { ...mockOrganization, name: "Company Updated" };
      (axios.put as any).mockResolvedValue({ data: updatedOrganization });

      const result = await editOrganization(updatedOrganization);

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

      await expect(editOrganization(mockOrganization)).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteOrganization", () => {
    it("should delete an organization successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await removeOrganization(mockOrganization.id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/organizations/${mockOrganization.id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(removeOrganization(mockOrganization.id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
