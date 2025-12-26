import axiosClient from './axiosClient';

export type UserDetail = {
  fullName?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  city?: string;
  address?: string;
  metadata?: Record<string, string>;
};

export type User = {
  id: number;
  username: string;
  email: string;
  detail?: UserDetail;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export const userApi = {
  getAll(): Promise<ApiResponse<User[]>> {
    return axiosClient.get('/api/users');
  },

  getDetail(id: number): Promise<ApiResponse<User>> {
    return axiosClient.get(`/api/users/${id}`);
  },

  create(data: {
    username: string;
    email: string;
    password: string;
    detail?: UserDetail;
  }): Promise<ApiResponse<User>> {
    return axiosClient.post('/api/users', data);
  },

  update(
    id: number,
    data: {
      email?: string;
      detail?: UserDetail;
    }
  ): Promise<ApiResponse<User>> {
    return axiosClient.put(`/api/users/${id}`, data);
  },

  delete(id: number): Promise<ApiResponse<void>> {
    return axiosClient.delete(`/api/users/${id}`);
  },

  updateAllTodosStatus(
    userId: number,
    completed: boolean
  ): Promise<ApiResponse<void>> {
    return axiosClient.put(`/api/users/${userId}/todos/status`, {
      completed,
    });
  },
};
