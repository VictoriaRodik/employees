import pool from "../config/db.js";
export class UserRepository {
  constructor() {
    this.pool = pool;
  }

  async getByUsername(username) {
    const [rows] = await this.pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0] || null;
  }
}
