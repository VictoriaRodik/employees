import { BaseRepository } from "./baseRepository.js";

export class ReferenceSourceRepository extends BaseRepository {
  constructor() {
    super("reference_sources"); 
  }
}