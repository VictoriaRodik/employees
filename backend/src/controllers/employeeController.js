const Employee = require("../models/employeeModel");

async function getEmployees(req, res) {
  try {
    const employees = await Employee.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).send("Error retrieving employees");
  }
}

async function createEmployee(req, res) {
  try {
    const newEmployeeId = await Employee.addEmployee(req.body);
    res
      .status(201)
      .json({ id: newEmployeeId, message: "Employee added successfully" });
  } catch (err) {
    res.status(500).send("Error adding employee");
  }
}

async function editEmployee(req, res) {
  try {
    const updatedRows = await Employee.updateEmployee(req.params.id, req.body);
    if (updatedRows > 0) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    res.status(500).send("Error updating employee");
  }
}

async function removeEmployee(req, res) {
  try {
    const deletedRows = await Employee.deleteEmployee(req.params.id);
    if (deletedRows > 0) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    res.status(500).send("Error deleting employee");
  }
}

module.exports = { getEmployees, createEmployee, editEmployee, removeEmployee };
