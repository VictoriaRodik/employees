import { BaseRepository } from "./baseRepository.js";

export class OrderItemRepository extends BaseRepository {
  constructor() {
    super("order_items"); 
  }
}