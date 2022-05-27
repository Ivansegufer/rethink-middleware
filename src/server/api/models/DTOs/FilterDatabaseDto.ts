import { PairKeyFilter } from "../FilterPayload";

export interface FilterDatabaseDto {
  table: string;
  filters?: PairKeyFilter[];
  orderBy?: {
    key: string;
    order: "desc" | "asc";
  };
  offset?: number;
  limit?: number;
}
