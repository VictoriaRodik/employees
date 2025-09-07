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
      order_types.name as order_type_name,
      employees.full_name as employee_full_name,
      field_definitions.name as field_definition_name
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      LEFT JOIN order_types ON orders.order_type_id = order_types.id
      JOIN employees ON order_items.employee_id = employees.id
      JOIN field_definitions ON order_items.field_id = field_definitions.id`
    );
    return rows;
  }
  
  async getByEmployeeId(employeeId) {
    const [rows] = await this.pool.query(
      `SELECT order_items.*, 
      orders.order_number,
      orders.order_date,
      order_types.name as order_type_name,
      employees.full_name as employee_full_name,
      field_definitions.name as field_definition_name
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      LEFT JOIN order_types ON orders.order_type_id = order_types.id
      JOIN employees ON order_items.employee_id = employees.id
      JOIN field_definitions ON order_items.field_id = field_definitions.id
      WHERE order_items.employee_id = ?
      ORDER BY orders.order_date DESC, order_items.id DESC`,
      [employeeId]
    );
    return rows;
  }

  async getLatestQualificationGradeByEmployeeId(employeeId) {
    const [rows] = await this.pool.query(
      `SELECT 
        oi.id as order_item_id,
        oi.value_id as qualification_grade_id,
        qg.grade as qualification_grade,
        o.id as order_id,
        o.order_number,
        o.order_date
      FROM order_items oi
      JOIN field_definitions fd ON oi.field_id = fd.id
      LEFT JOIN reference_sources rs ON fd.reference_source_id = rs.id
      JOIN orders o ON oi.order_id = o.id
      LEFT JOIN qualification_grades qg ON oi.value_id = qg.id
      WHERE oi.employee_id = ?
        AND fd.type = 'reference'
        AND rs.table_name = 'qualification_grades'
      ORDER BY o.order_date DESC, oi.id DESC
      LIMIT 1`,
      [employeeId]
    );
    return rows?.[0] || null;
  }

  async getLatestReferenceByEmployeeIdAndTable(employeeId, tableName) {
    const [rows] = await this.pool.query(
      `SELECT 
        oi.id as order_item_id,
        oi.value_id as reference_id,
        t.name as reference_name,
        o.id as order_id,
        o.order_number,
        o.order_date
      FROM order_items oi
      JOIN field_definitions fd ON oi.field_id = fd.id
      LEFT JOIN reference_sources rs ON fd.reference_source_id = rs.id
      JOIN orders o ON oi.order_id = o.id
      JOIN ${tableName} t ON oi.value_id = t.id
      WHERE oi.employee_id = ?
        AND fd.type = 'reference'
        AND rs.table_name = ?
      ORDER BY o.order_date DESC, oi.id DESC
      LIMIT 1`,
      [employeeId, tableName]
    );
    return rows?.[0] || null;
  }
  async getById(id) {
    const [rows] = await this.pool.query(
      `SELECT order_items.*, 
      orders.order_number,
      orders.order_date,
      order_types.name as order_type_name,
      employees.full_name as employee_full_name,
      field_definitions.name as field_definition_name
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      LEFT JOIN order_types ON orders.order_type_id = order_types.id
      JOIN employees ON order_items.employee_id = employees.id
      JOIN field_definitions ON order_items.field_id = field_definitions.id
      WHERE order_items.id = ?`,
      [id]
    );
    return rows[0];
  }
  async getByOrderId(orderId) {
    const [rows] = await this.pool.query(
      `SELECT order_items.*, 
      orders.order_number,
      orders.order_date,
      order_types.name as order_type_name,
      employees.full_name as employee_full_name,
      field_definitions.name as field_definition_name,
      field_definitions.order_index as field_order_index
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      LEFT JOIN order_types ON orders.order_type_id = order_types.id
      JOIN employees ON order_items.employee_id = employees.id
      JOIN field_definitions ON order_items.field_id = field_definitions.id
      WHERE order_items.order_id = ?
      ORDER BY employees.full_name ASC, field_definitions.order_index ASC, order_items.id ASC`,
      [orderId]
    );
    return rows;
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
