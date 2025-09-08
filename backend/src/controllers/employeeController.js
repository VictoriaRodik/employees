import * as employeeService from "../services/employeeService.js";

const getEmployees = async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.json(employees);
};

const getEmployee = async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

const createEmployee = async (req, res) => {
  const newEmployee = await employeeService.createEmployee(req.body);
  res.status(201).json(newEmployee);
};

const updateEmployee = async (req, res) => {
  const success = await employeeService.updateEmployee(req.params.id, req.body);
  if (success) {
    res.json({ message: "Employee updated" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

const deleteEmployee = async (req, res) => {
  const success = await employeeService.deleteEmployee(req.params.id);
  if (success) {
    res.json({ message: "Employee deleted" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

const getEmployeeProfile = async (req, res) => {
  try {
    const profile = await employeeService.getEmployeeProfile(req.params.id);
    res.json(profile);
  } catch (e) {
    if (e.message === 'Employee not found') {
      res.status(404).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'Failed to load profile' });
    }
  }
};

export default {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeProfile,
};
