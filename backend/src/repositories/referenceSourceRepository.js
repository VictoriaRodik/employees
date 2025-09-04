import { BaseRepository } from "./baseRepository.js";

export class ReferenceSourceRepository extends BaseRepository {
  constructor() {
    super("reference_sources");
  }

  async getItems(referenceSourceId) {
    const [sourceRows] = await this.pool.query(
      `SELECT * FROM reference_sources WHERE id = ?`,
      [referenceSourceId]
    );

    if (sourceRows.length === 0) {
      throw new Error("Reference source not found");
    }

    const referenceSource = sourceRows[0];
    const tableName = referenceSource.table_name;

    if (!tableName) {
      throw new Error("Table name not specified for this reference source");
    }

    const [rows] = await this.pool.query(`SELECT * FROM ${tableName}`, []);

    return rows;
  }
}
