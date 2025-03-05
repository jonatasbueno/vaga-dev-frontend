export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserRequest {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UsersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: User[];
}

export interface UsersRequest {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserRequest[];
}

export interface UsersStatus {
  response: UsersResponse | null;
}