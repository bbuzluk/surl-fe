// src/types/common.ts


export type Timestamp = string; 

export interface IApiError {
  code: string;
  message: string;
}

export interface IPageMeta {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}


export interface IApiResponse<T> {
  timestamp: Timestamp;
  
  success: boolean; 
  
  data: T | null; 
  
  details: Record<string, any> | null; 
  
  page: IPageMeta | null; 
  
  error: IApiError | null;
  
  errorMessage: string | null;
}