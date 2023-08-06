export class PaginatedEntities<T> {
  items: T[];
  total?: number;
  startCursor?: string;
  endCursor?: string;
  hasNext?: boolean;
}
