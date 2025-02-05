const pool = require('../config/db');

async function getAllEmployees() {
  const [rows] = await pool.query('SELECT * FROM employees');
  return rows;
}

async function getEmployeeById(id) {
  const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { getAllEmployees, getEmployeeById };
