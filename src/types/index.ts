export interface BaseType {
  id: string;
  code?: string;
  name: string;

  created_at: string;
  creator_id: string;

  updated_at: string;
  editor_id: string;

  status: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface PaginationResponse {
  current_page: number;
  size: number;
  total_page: number;
}

export interface GetIndexResponse<T> {
  data: T[];
  paging: PaginationResponse;
}

export interface Transformer {
  create?(payload: any): any;
  update?(payload: any): any;
}
