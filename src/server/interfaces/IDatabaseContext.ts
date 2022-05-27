import { FilterDatabaseDto } from "../api/models/DTOs/FilterDatabaseDto";

export default interface IDatabaseContext {
  getAllDocumentsByFilter(options: FilterDatabaseDto): Promise<any[]>;
}
