import { describe, expect, it, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../api/employees";
import { EmployeeInterface } from "../../types/employee";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Employee API Functions", () => {
  const mockEmployee: EmployeeInterface = {
    id: 1,
    taxId: "1234567890",
    fullName: "John Doe",
    address: "123 Main St",
    passportSeries: "СР",
    passportNumber: "123456",
    passportIssueDate: "2023-01-01",
    passportIssuedBy: "5600",
    personnelNumber: "001",
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
      expect(result.taxId).toBe(newEmployee.taxId);
      expect(result.fullName).toBe(newEmployee.fullName);
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

      const result = await updateEmployee(updatedEmployee);

      expect(axios.put).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/employees/${updatedEmployee.id}`,
        updatedEmployee
      );
      expect(result).toEqual(updatedEmployee);
      expect(result.fullName).toBe("John Updated");
    });

    it("should throw error on update failure", async () => {
      const error = new Error("Not found");
      (axios.put as any).mockRejectedValue(error);

      await expect(updateEmployee(mockEmployee)).rejects.toThrow("Not found");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee successfully", async () => {
      (axios.delete as any).mockResolvedValue({});

      await deleteEmployee(mockEmployee.id);

      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/employees/${mockEmployee.id}`
      );
    });

    it("should throw error on delete failure", async () => {
      const error = new Error("Forbidden");
      (axios.delete as any).mockRejectedValue(error);

      await expect(deleteEmployee(mockEmployee.id)).rejects.toThrow(
        "Forbidden"
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
