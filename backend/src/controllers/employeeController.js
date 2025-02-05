const Employee = require('../models/employeeModel');

async function getEmployees(req, res) {
  try {
    const employees = await Employee.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).send('Error retrieving employees');
  }
}

module.exports = { getEmployees };
