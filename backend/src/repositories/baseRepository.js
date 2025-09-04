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
    const { id: _, ...newData } = data;
    const keys = Object.keys(newData).join(", ");
    const placeholders = Object.keys(newData)
      .map(() => "?")
      .join(", ");
    const values = Object.values(newData);
    const [result] = await this.pool.query(
      `INSERT INTO ${this.table} (${keys}) VALUES (${placeholders})`,
      values
    );
    return { id: result.insertId };
  }

  async update(id, data) {
    const { id: _, ...newData } = data;

    const fields = Object.keys(newData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(newData), Number(id)];

    const [result] = await this.pool.query(
      `UPDATE ${this.table} SET ${fields} WHERE id = ?`,
      values
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
