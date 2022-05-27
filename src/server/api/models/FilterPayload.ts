export type PairKeyFilter = {
  key: string;
  values: any[];
};

export interface FilterPayload {
  table: string;
  filters?: PairKeyFilter[];
  orderBy?: {
    key: string;
    order: "desc" | "asc";
  };
  offset?: number;
  limit?: number;
}
