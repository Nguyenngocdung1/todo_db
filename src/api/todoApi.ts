import axiosClient from './axiosClient';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
};

export const todoApi = {
  getAll(page = 1, size = 5, keyword = ''): Promise<ApiResponse<PaginatedResponse<Todo>>> {
    return axiosClient.get('/api/todos', { params: { page, size, keyword } });
  },

  create(title: string): Promise<ApiResponse<Todo>> {
    return axiosClient.post('/api/todos', { title });
  },

  update(
    id: number,
    data: Partial<Pick<Todo, 'title' | 'completed'>>
  ): Promise<ApiResponse<Todo>> {
    return axiosClient.put(`/api/todos/${id}`, data);
  },

  delete(id: number): Promise<ApiResponse<void>> {
    return axiosClient.delete(`/api/todos/${id}`);
  }
};
