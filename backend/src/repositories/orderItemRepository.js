import { BaseRepository } from "./baseRepository.js";

export class OrderItemRepository extends BaseRepository {
  constructor() {
    super("order_items");
  }
  async getAll() {
    const [rows] = await this.pool.query(
      `SELECT order_items.*, 
      orders.order_number,
      orders.order_date,
      employees.full_name as employee_full_name,
      field_definitions.name as field_definition_name
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      JOIN employees ON order_items.employee_id = employees.id
      JOIN field_definitions ON order_items.field_id = field_definitions.id`
    );
    return rows;
  }
  async getById(id) {
    const [rows] = await this.pool.query(
      `SELECT order_items.*, 
      orders.order_number,
      orders.order_date,
      employees.full_name as employee_full_name,
      field_definitions.name as field_definition_name
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      JOIN employees ON order_items.employee_id = employees.id
      JOIN field_definitions ON order_items.field_id = field_definitions.id
      WHERE order_items.id = ?`,
      [id]
    );
    return rows[0];
  }
  async create(data) {
    const { order_id, employee_id, field_id, value, value_id } = data;
    const [result] = await this.pool.query(
      `INSERT INTO order_items (order_id, employee_id, field_id, value, value_id) 
      VALUES (?, ?, ?, ?, ?)`,
      [order_id, employee_id, field_id, value, value_id]
    );
    return result.insertId;
  }
  async update(id, data) {
    const { order_id, employee_id, field_id, value, value_id } = data;
    const [result] = await this.pool.query(
      `UPDATE order_items SET order_id = ?, employee_id = ?, field_id = ?, value = ?, value_id = ? WHERE id = ?`,
      [order_id, employee_id, field_id, value, value_id, id]
    );
    return result.affectedRows;
  }
}
