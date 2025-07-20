export class BaseRepository {
  constructor(tableName, pool) {
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

  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
