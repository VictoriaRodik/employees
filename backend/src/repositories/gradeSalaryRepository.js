import { BaseRepository } from "./baseRepository.js";

export class GradeSalaryRepository extends BaseRepository {
  constructor() {
    super("grade_salaries");
  }
  async getAll() {
    const [rows] = await this.pool.query(
      `SELECT grade_salaries.*, 
      qualification_grades.grade 
      FROM grade_salaries
      JOIN qualification_grades ON grade_salaries.grade_id = qualification_grades.id`
    );
    return rows;
  }
  async getById(id) {
    const [rows] = await this.pool.query(
      `SELECT grade_salaries.*, 
      qualification_grades.grade 
      FROM grade_salaries
      JOIN qualification_grades ON grade_salaries.grade_id = qualification_grades.id
      WHERE grade_salaries.id = ?`,
      [id]
    );
    return rows[0];
  }

  async getLatestByGradeId(gradeId) {
    const [rows] = await this.pool.query(
      `SELECT grade_salaries.*, 
      qualification_grades.grade 
      FROM grade_salaries
      JOIN qualification_grades ON grade_salaries.grade_id = qualification_grades.id
      WHERE grade_salaries.grade_id = ?
      ORDER BY effective_from DESC, grade_salaries.id DESC
      LIMIT 1`,
      [gradeId]
    );
    return rows?.[0] || null;
  }
  async create(data) {
    const { grade_id, base_salary, effective_from } = data;
    const [result] = await this.pool.query(
      `INSERT INTO grade_salaries (grade_id, base_salary, effective_from) 
      VALUES (?, ?, ?)`,
      [grade_id, base_salary, effective_from]
    );
    return result.insertId;
  }
  async update(id, data) {
    const { grade_id, base_salary, effective_from } = data;
    const [result] = await this.pool.query(
      `UPDATE grade_salaries SET grade_id = ?, base_salary = ?, effective_from = ? WHERE id = ?`,
      [grade_id, base_salary, effective_from, id]
    );
    return result.affectedRows;
  }
}
