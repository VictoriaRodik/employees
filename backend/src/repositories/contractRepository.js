import { BaseRepository } from "./baseRepository.js";

export class ContractRepository extends BaseRepository {
  constructor() {
    super("contracts");
  }
  async getAll() {
    const [rows] = await this.pool.query(
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
      organizations.legal_address,
      organizations.phone,
      organizations.bank_account,
      organizations.bank_name,
      organizations.foundation_doc,
      organizations.director_position,
      organizations.director_full_name
      FROM contracts
      JOIN employees ON contracts.employee_id = employees.id
      JOIN organizations ON contracts.organization_id = organizations.id`
    );
    return rows;
  }

  async getById(id) {
    const [rows] = await this.pool.query(
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
      organizations.legal_address,
      organizations.phone,
      organizations.bank_account,
      organizations.bank_name,
      organizations.foundation_doc,
      organizations.director_position,
      organizations.director_full_name
      FROM contracts
      JOIN employees ON contracts.employee_id = employees.id
      JOIN organizations ON contracts.organization_id = organizations.id 
      WHERE contracts.id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(data) {
    const {
      employee_id,
      organization_id,
      contract_date,
      contract_end_date,
      contract_amount,
      contract_content,
      contract_number,
    } = data;

    const [result] = await this.pool.query(
      `INSERT INTO contracts (
        employee_id,
        organization_id,
        contract_date,
        contract_end_date,
        contract_amount,
        contract_content,
        contract_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

  async update(id, data) {
    const {
      employee_id,
      organization_id,
      contract_date,
      contract_end_date,
      contract_amount,
      contract_content,
      contract_number,
    } = data;

    const [result] = await this.pool.query(
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
}
