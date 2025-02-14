const pool = require("../config/db");

async function getAllContracts() {
  const [rows] = await pool.query("SELECT * FROM contracts");
  return rows;
}

async function getContractById(id) {
  const [rows] = await pool.query("SELECT * FROM contracts WHERE id = ?", [id]);
  return rows[0];
}

async function addContract(contractData) {
  const {
    employee_id,
    contract_date,
    contract_end_date,
    contract_amount,
    contract_content,
    contract_number,
  } = contractData;
  const [result] = await pool.query(
    `INSERT INTO contracts (
    employee_id,
    contract_date,
    contract_end_date,
    contract_amount,
    contract_content,
    contract_number) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      employee_id,
      contract_date,
      contract_end_date,
      contract_amount,
      contract_content,
      contract_number,
    ]
  );
  return result.insertId;
}

async function updateContract(id, updatedData) {
  const {
    employee_id,
    contract_date,
    contract_end_date,
    contract_amount,
    contract_content,
    contract_number,
  } = updatedData;
  const [result] = await pool.query(
    `UPDATE contracts SET 
            employee_id = ?,
            contract_date = ?,
            contract_end_date = ?,
            contract_amount = ?,
            contract_content = ?,
            contract_number =?
     WHERE id = ?`,
    [
      employee_id,
      contract_date,
      contract_end_date,
      contract_amount,
      contract_content,
      contract_number,
      id
    ]
  );
  return result.affectedRows;
}

async function deleteContract(id) {
  const [result] = await pool.query("DELETE FROM contracts WHERE id = ?", [id]);
  return result.affectedRows;
}

module.exports = {
  getAllContracts,
  getContractById,
  addContract,
  updateContract,
  deleteContract,
};
