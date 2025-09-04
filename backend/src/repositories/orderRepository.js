import { BaseRepository } from "./baseRepository.js";

export class OrderRepository extends BaseRepository {
  constructor() {
    super("orders");
  }
  async getAll() {
    const [rows] = await this.pool.query(
      `SELECT orders.*, 
      order_types.name as order_type_name 
      FROM orders
      LEFT JOIN order_types ON orders.order_type_id = order_types.id`
    );
    return rows;
  }
  async getById(id) {
    const [rows] = await this.pool.query(
      `SELECT orders.*, 
      order_types.name as order_type_name 
      FROM orders
      LEFT JOIN order_types ON orders.order_type_id = order_types.id
      WHERE orders.id = ?`,
      [id]
    );
    return rows[0];
  }
  async create(data) {
    const { order_number, order_date, order_type_id } = data;
    const [result] = await this.pool.query(
      `INSERT INTO orders (order_number, order_date, order_type_id) 
      VALUES (?, ?, ?)`,
      [order_number, order_date, order_type_id]
    );
    return result.insertId;
  }
  async update(id, data) {
    const { order_number, order_date, order_type_id } = data;
    const [result] = await this.pool.query(
      `UPDATE orders SET order_number = ?, order_date = ?, order_type_id = ? WHERE id = ?`,
      [order_number, order_date, order_type_id, id]
    );
    return result.affectedRows;
  }
}
