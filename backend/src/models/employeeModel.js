const pool = require("../config/db");

async function getAllEmployees() {
  const [rows] = await pool.query("SELECT * FROM employees");
  return rows;
}

async function getEmployeeById(id) {
  const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [id]);
  return rows[0];
}

async function addEmployee(employeeData) {
  const {
    tax_id,
    full_name,
    address,
    passport_series,
    passport_number,
    passport_issue_date,
    passport_issued_by,
    personnel_number,
  } = employeeData;
  const [result] = await pool.query(
    `INSERT INTO employees (tax_id, full_name, address, passport_series, passport_number, passport_issue_date, passport_issued_by, personnel_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      tax_id || null,
      full_name || null,
      address || null,
      passport_series || null,
      passport_number || null,
      passport_issue_date || null,
      passport_issued_by || null,
      personnel_number || null,
    ]
  );
  return result.insertId;
}

async function updateEmployee(id, updatedData) {
  const {
    tax_id,
    full_name,
    address,
    passport_series,
    passport_number,
    passport_issue_date,
    passport_issued_by,
    personnel_number,
  } = updatedData;
  const [result] = await pool.query(
    `UPDATE employees SET tax_id = ?, full_name = ?, address = ?, passport_series = ?, passport_number = ?, passport_issue_date = ?, passport_issued_by = ?, personnel_number = ? WHERE id = ?`,
    [
      tax_id,
      full_name,
      address,
      passport_series,
      passport_number,
      passport_issue_date,
      passport_issued_by,
      personnel_number,
      id,
    ]
  );
  return result.affectedRows;
}

async function deleteEmployee(id) {
  const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [id]);
  return result.affectedRows;
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
