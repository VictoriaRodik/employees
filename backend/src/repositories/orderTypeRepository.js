import { BaseRepository } from "./baseRepository.js";

export class OrderTypeRepository extends BaseRepository {
  constructor() {
    super("order_types"); 
  }
}