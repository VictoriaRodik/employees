import { BaseRepository } from "./baseRepository.js";

export class OrderRepository extends BaseRepository {
  constructor() {
    super("orders"); 
  }
}