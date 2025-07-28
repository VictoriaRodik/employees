import * as departmentService from "../services/departmentService.js";

const getDepartments = async (req, res) => {
  const departments = await departmentService.getAllDepartments();
  res.json(departments);
};

const getDepartment = async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.id);
  if (department) {
    res.json(department);
  } else {
    res.status(404).json({ message: "Department not found" });
  }
};

const createDepartment = async (req, res) => {
  const newDepartment = await departmentService.createDepartment(req.body);
  res.status(201).json(newDepartment);
};

const updateDepartment = async (req, res) => {
  const success = await departmentService.updateDepartment(req.params.id, req.body);
  if (success) {
    res.json({ message: "Department updated" });
  } else {
    res.status(404).json({ message: "Department not found" });
  }
};

const deleteDepartment = async (req, res) => {
  const success = await departmentService.deleteDepartment(req.params.id);
  if (success) {
    res.json({ message: "Department deleted" });
  } else {
    res.status(404).json({ message: "Department not found" });
  }
};

export default {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
