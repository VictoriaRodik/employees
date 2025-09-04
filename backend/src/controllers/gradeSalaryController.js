import * as gradeSalaryService from "../services/gradeSalaryService.js";

const getGradeSalaries = async (req, res) => {
  const gradeSalaries = await gradeSalaryService.getAllGradeSalaries();
  res.json(gradeSalaries);
};

const getGradeSalary = async (req, res) => {
  const gradeSalaries = await gradeSalaryService.getGradeSalaryById(req.params.id);
  if (gradeSalaries) {
    res.json(gradeSalaries);
  } else {
    res.status(404).json({ message: "GradeSalary not found" });
  }
};

const createGradeSalary = async (req, res) => {
  const newGradeSalary = await gradeSalaryService.createGradeSalary(req.body);
  res.status(201).json(newGradeSalary);
};

const updateGradeSalary = async (req, res) => {
  const success = await gradeSalaryService.updateGradeSalary(req.params.id, req.body);
  if (success) {
    res.json({ message: "GradeSalary updated" });
  } else {
    res.status(404).json({ message: "GradeSalary not found" });
  }
};

const deleteGradeSalary = async (req, res) => {
  const success = await gradeSalaryService.deleteGradeSalary(req.params.id);
  if (success) {
    res.json({ message: "GradeSalary deleted" });
  } else {
    res.status(404).json({ message: "GradeSalary not found" });
  }
};

export default {
  getGradeSalaries,
  getGradeSalary,
  createGradeSalary,
  updateGradeSalary,
  deleteGradeSalary,
};
