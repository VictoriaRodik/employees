import { BaseRepository } from "./baseRepository.js";

export class FieldDefinitionRepository extends BaseRepository {
  constructor() {
    super("field_definitions");
  }

  async getAll() {
    const [rows] = await this.pool.query(
      `SELECT field_definitions.*, 
      reference_sources.table_name as reference_source_name 
      FROM field_definitions
      LEFT JOIN reference_sources ON field_definitions.reference_source_id = reference_sources.id`
    );
    return rows;
  }
  async getById(id) {
    const [rows] = await this.pool.query(
      `SELECT field_definitions.*, 
      reference_sources.table_name as reference_source_name 
      FROM field_definitions
      LEFT JOIN reference_sources ON field_definitions.reference_source_id = reference_sources.id
      WHERE field_definitions.id = ?`,
      [id]
    );
    return rows[0];
  }
  async create(data) {
    const { name, type, order_index, reference_source_id } = data;
    
    // Для полів, які не потребують довідника, встановлюємо NULL
    const finalReferenceSourceId = (type === 'reference' && reference_source_id) 
      ? reference_source_id 
      : null;
    
    const [result] = await this.pool.query(
      `INSERT INTO field_definitions (name, type, order_index, reference_source_id) 
      VALUES (?, ?, ?, ?)`,
      [name, type, order_index, finalReferenceSourceId]
    );
    return result.insertId;
  }
  async update(id, data) {
    const { name, type, order_index, reference_source_id } = data;
    
    // Для полів, які не потребують довідника, встановлюємо NULL
    const finalReferenceSourceId = (type === 'reference' && reference_source_id) 
      ? reference_source_id 
      : null;
    
    const [result] = await this.pool.query(
      `UPDATE field_definitions SET name = ?, type = ?, order_index = ?, reference_source_id = ? WHERE id = ?`,
      [name, type, order_index, finalReferenceSourceId, id]
    );
    return result.affectedRows;
  }
}
