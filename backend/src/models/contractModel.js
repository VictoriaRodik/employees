const pool = require("../config/db");

async function getAllContracts() {
  const [rows] = await pool.query(
    `SELECT  
    contracts.*,
    employees.tax_id,
    employees.full_name,
    employees.address,
    employees.passport_series,
    employees.passport_number,
    employees.passport_issue_date,
    employees.passport_issued_by,
    organizations.name,
    organizations.short_name,
    organizations.edrpou_code,
    organizations.address,
    organizations.phone,
    organizations.bank_account,
    organizations.bank_name,
    organizations.foundation_doc,
    organizations.director_position,
    organizations.director_full_name
    FROM
    contracts
        JOIN
    employees ON contracts.employee_id = employees.id
        JOIN
    organizations ON contracts.organization_id = organizations.id`
  );
  return rows;
}

async function getContractById(id) {
  const [rows] = await pool.query(
    `SELECT 
    contracts.*,
    employees.tax_id,
    employees.full_name,
    employees.address,
    employees.passport_series,
    employees.passport_number,
    employees.passport_issue_date,
    employees.passport_issued_by,
    organizations.name,
    organizations.short_name,
    organizations.edrpou_code,
    organizations.address,
    organizations.phone,
    organizations.bank_account,
    organizations.bank_name,
    organizations.foundation_doc,
    organizations.director_position,
    organizations.director_full_name
    FROM
    contracts
        JOIN
    employees ON contracts.employee_id = employees.id
        JOIN
    organizations ON contracts.organization_id = organizations.id 
    WHERE contracts.id = ?`,
    [id]
  );
  return rows[0];
}

async function addContract(contractData) {
  const {
    employee_id,
    organization_id,
    contract_date,
    contract_end_date,
    contract_amount,
    contract_content,
    contract_number,
  } = contractData;
  const [result] = await pool.query(
    `INSERT INTO contracts (
    employee_id,
    organization_id,
    contract_date,
    contract_end_date,
    contract_amount,
    contract_content,
    contract_number)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      employee_id,
      organization_id || 1,
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
    organization_id,
    contract_date,
    contract_end_date,
    contract_amount,
    contract_content,
    contract_number,
  } = updatedData;

  const [result] = await pool.query(
    `UPDATE contracts SET
      employee_id = ?,
      organization_id = ?,
      contract_date = ?,
      contract_end_date = ?,
      contract_amount = ?,
      contract_content = ?,
      contract_number = ?
    WHERE id = ?`,
    [
      employee_id,
      organization_id || 1,
      contract_date,
      contract_end_date,
      contract_amount,
      contract_content,
      contract_number,
      id,
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
