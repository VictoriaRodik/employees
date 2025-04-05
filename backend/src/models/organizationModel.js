const pool = require("../config/db");

async function getAllOrganizations() {
  const [rows] = await pool.query("SELECT * FROM organizations");
  return rows;
}

async function getOrganizationById(id) {
  const [rows] = await pool.query("SELECT * FROM organizations WHERE id = ?", [id]);
  return rows[0];
}

async function addOrganization(data) {
  const {
    name,
    short_name,
    edrpou_code,
    address,
    phone,
    bank_account,
    bank_name,
    foundation_doc,
    director_position,
    director_full_name,
  } = data;

  const [result] = await pool.query(
    `INSERT INTO organizations (
      name, short_name, edrpou_code, address, phone,
      bank_account, bank_name, foundation_doc, director_position, director_full_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      short_name,
      edrpou_code,
      address,
      phone,
      bank_account,
      bank_name,
      foundation_doc,
      director_position,
      director_full_name,
    ]
  );

  return result.insertId;
}

async function updateOrganization(id, data) {
  const {
    name,
    short_name,
    edrpou_code,
    address,
    phone,
    bank_account,
    bank_name,
    foundation_doc,
    director_position,
    director_full_name,
  } = data;

  const [result] = await pool.query(
    `UPDATE organizations SET
      name = ?, short_name = ?, edrpou_code = ?, address = ?, phone = ?,
      bank_account = ?, bank_name = ?, foundation_doc = ?, director_position = ?, director_full_name = ?
     WHERE id = ?`,
    [
      name,
      short_name,
      edrpou_code,
      address,
      phone,
      bank_account,
      bank_name,
      foundation_doc,
      director_position,
      director_full_name,
      id,
    ]
  );

  return result.affectedRows;
}

async function deleteOrganization(id) {
  const [result] = await pool.query("DELETE FROM organizations WHERE id = ?", [id]);
  return result.affectedRows;
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  addOrganization,
  updateOrganization,
  deleteOrganization,
};
