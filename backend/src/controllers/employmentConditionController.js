import * as employmentConditionService from "../services/employmentConditionService.js";

const getEmploymentConditions = async (req, res) => {
  const employmentConditions = await employmentConditionService.getAllEmploymentConditions();
  res.json(employmentConditions);
};

const getEmploymentCondition = async (req, res) => {
  const employmentConditions = await employmentConditionService.getEmploymentConditionById(req.params.id);
  if (employmentConditions) {
    res.json(employmentConditions);
  } else {
    res.status(404).json({ message: "EmploymentCondition not found" });
  }
};

const createEmploymentCondition = async (req, res) => {
  const newEmploymentCondition = await employmentConditionService.createEmploymentCondition(req.body);
  res.status(201).json(newEmploymentCondition);
};

const updateEmploymentCondition = async (req, res) => {
  const success = await employmentConditionService.updateEmploymentCondition(req.params.id, req.body);
  if (success) {
    res.json({ message: "EmploymentCondition updated" });
  } else {
    res.status(404).json({ message: "EmploymentCondition not found" });
  }
};

const deleteEmploymentCondition = async (req, res) => {
  const success = await employmentConditionService.deleteEmploymentCondition(req.params.id);
  if (success) {
    res.json({ message: "EmploymentCondition deleted" });
  } else {
    res.status(404).json({ message: "EmploymentCondition not found" });
  }
};

export default {
  getEmploymentConditions,
  getEmploymentCondition,
  createEmploymentCondition,
  updateEmploymentCondition,
  deleteEmploymentCondition,
};
