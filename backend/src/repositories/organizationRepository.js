import { BaseRepository } from "./baseRepository.js";

export class OrganizationRepository extends BaseRepository {
  constructor() {
    super("organizations");
  }
  async create(data) {
    const {
      name,
      short_name,
      edrpou_code,
      legal_address,
      phone,
      bank_account,
      bank_name,
      foundation_doc,
      director_position,
      director_full_name,
    } = data;

    const [result] = await this.pool.query(
      `INSERT INTO organizations (
        name, short_name, edrpou_code, legal_address, phone,
        bank_account, bank_name, foundation_doc, director_position, director_full_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        short_name,
        edrpou_code,
        legal_address,
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

  async update(id, data) {
    const {
      name,
      short_name,
      edrpou_code,
      legal_address,
      phone,
      bank_account,
      bank_name,
      foundation_doc,
      director_position,
      director_full_name,
    } = data;

    const [result] = await this.pool.query(
      `UPDATE organizations SET
        name = ?, short_name = ?, edrpou_code = ?, legal_address = ?, phone = ?,
        bank_account = ?, bank_name = ?, foundation_doc = ?, director_position = ?, director_full_name = ?
       WHERE id = ?`,
      [
        name,
        short_name,
        edrpou_code,
        legal_address,
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
}
