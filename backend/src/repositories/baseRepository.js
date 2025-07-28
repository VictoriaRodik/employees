import pool from "../config/db.js";
export class BaseRepository {
  constructor(tableName) {
    this.table = tableName;
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async getById(id) {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

    async create(data) {
    const keys = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const [result] = await pool.query(
      `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
      values
    );
    return { id: result.insertId };
  }

  async update(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await pool.query(
      `UPDATE ${tableName} SET ${fields} WHERE id = ?`,
      values
    );
  }

  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
