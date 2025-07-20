import { BaseRepository } from "./baseRepository.js";

export class EmployeeRepository extends BaseRepository {
  constructor(pool) {
    super("employees", pool);
  }
  async create(data) {
    const {
      tax_id,
      full_name,
      address,
      passport_series,
      passport_number,
      passport_issue_date,
      passport_issued_by,
      personnel_number,
    } = data;

    const [result] = await this.pool.query(
      `INSERT INTO employees (tax_id, full_name, address, passport_series, passport_number, passport_issue_date, passport_issued_by, personnel_number) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tax_id,
        full_name,
        address,
        passport_series,
        passport_number,
        passport_issue_date,
        passport_issued_by,
        personnel_number,
      ]
    );
    return result.insertId;
  }

  async update(id, data) {
    const {
      tax_id,
      full_name,
      address,
      passport_series,
      passport_number,
      passport_issue_date,
      passport_issued_by,
      personnel_number,
    } = data;

    const [result] = await this.pool.query(
      `UPDATE employees SET 
        tax_id = ?, 
        full_name = ?, 
        address = ?, 
        passport_series = ?, 
        passport_number = ?, 
        passport_issue_date = ?, 
        passport_issued_by = ?, 
        personnel_number = ? 
      WHERE id = ?`,
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
}
