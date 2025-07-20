export class UserRepository {
  constructor(pool) {
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
