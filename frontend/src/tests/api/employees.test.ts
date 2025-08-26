import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../../api/employees";
import { ApiEmployee } from "../../types/employee";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Employee API Functions", () => {
  const mockEmployee: ApiEmployee = {
    id: 1,
    tax_id: "1234567890",
    full_name: "John Doe",
    address: "123 Main St",
    passport_series: "СР",
    passport_number: "123456",
    passport_issue_date: "2023-01-01",
    passport_issued_by: "5600",
    personnel_number: "001",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("fetchEmployees", () => {
    it("should fetch employees successfully", async () => {
      const mockEmployees = [mockEmployee];
      (axios.get as any).mockResolvedValue({ data: mockEmployees });

      const result = await fetchEmployees();

      expect(axios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/employees`
      );
      expect(result).toEqual(mockEmployees);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("taxId");
      expect(result[0]).toHaveProperty("fullName");
    });

    it("should throw error on fetch failure", async () => {
      const error = new Error("Network error");
      (axios.get as any).mockRejectedValue(error);

      await expect(fetchEmployees()).rejects.toThrow("Network error");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("addEmployee", () => {
    it("should add an employee successfully", async () => {
      const newEmployee = { ...mockEmployee, id: 0 };
      const createdEmployee = { ...newEmployee, id: 2 };
      (axios.post as any).mockResolvedValue({ data: createdEmployee });

      const result = await addEmployee(newEmployee);

      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/employees`,
        newEmployee
      );
      expect(result).toEqual(createdEmployee);
      expect(result.tax_id).toBe(newEmployee.tax_id);
      expect(result.full_name).toBe(newEmployee.full_name);
      expect(result.id).toBeDefined();
    });

    it("should throw error on add failure", async () => {
      const error = new Error("Bad request");
      (axios.post as any).mockRejectedValue(error);

      await expect(addEmployee(mockEmployee)).rejects.toThrow("Bad request");
      expect(console.error).toHaveBeenCalledWith(
        "Error adding to employees:",
        error
      );
    });
  });

  describe("updateEmployee", () => {
    it("should update an employee successfully", async () => {
      const updatedEmployee = { ...mockEmployee, fullName: "John Updated" };
      (axios.put as any).mockResolvedValue({ data: updatedEmployee });

      const result = await editEmployee(updatedEmployee);

      expect(axios.put).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/employees/${updatedEmployee.id}`,
        updatedEmployee
      );
      expect(result).toEqual(updatedEmployee);
      expect(result.full_name).toBe("John Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axios.put as any).mockRejectedValue(error);

      await expect(editEmployee(mockEmployee)).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await removeEmployee(mockEmployee.id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/employees/${mockEmployee.id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(removeEmployee(mockEmployee.id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
