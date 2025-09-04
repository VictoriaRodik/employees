import { BaseRepository } from "./baseRepository.js";

export class WorkScheduleRepository extends BaseRepository {
  constructor() {
    super("work_schedules"); 
  }
}