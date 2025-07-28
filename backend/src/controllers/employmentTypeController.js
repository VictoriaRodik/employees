import * as employmentTypeService from "../services/employmentTypeService.js";

const getEmploymentTypes = async (req, res) => {
  const employmentTypes = await employmentTypeService.getAllEmploymentTypes();
  res.json(employmentTypes);
};

const getEmploymentType = async (req, res) => {
  const employmentTypes = await employmentTypeService.getEmploymentTypeById(req.params.id);
  if (employmentTypes) {
    res.json(employmentTypes);
  } else {
    res.status(404).json({ message: "EmploymentType not found" });
  }
};

const createEmploymentType = async (req, res) => {
  const newEmploymentType = await employmentTypeService.createEmploymentType(req.body);
  res.status(201).json(newEmploymentType);
};

const updateEmploymentType = async (req, res) => {
  const success = await employmentTypeService.updateEmploymentType(req.params.id, req.body);
  if (success) {
    res.json({ message: "EmploymentType updated" });
  } else {
    res.status(404).json({ message: "EmploymentType not found" });
  }
};

const deleteEmploymentType = async (req, res) => {
  const success = await employmentTypeService.deleteEmploymentType(req.params.id);
  if (success) {
    res.json({ message: "EmploymentType deleted" });
  } else {
    res.status(404).json({ message: "EmploymentType not found" });
  }
};

export default {
  getEmploymentTypes,
  getEmploymentType,
  createEmploymentType,
  updateEmploymentType,
  deleteEmploymentType,
};
