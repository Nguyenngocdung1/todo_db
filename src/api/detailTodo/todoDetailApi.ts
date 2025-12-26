import axiosClient from '../axiosClient';

export type TodoDetail = {
  description?: string;
  deadline?: string;
  priority?: number;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export const todoDetailApi = {
  getDetail(todoId: number): Promise<TodoDetail | null> {
    return axiosClient.get(`/api/todos/${todoId}/detail`);
  },

  saveOrUpdate(
    todoId: number,
    data: TodoDetail
  ): Promise<ApiResponse<TodoDetail>> {
    return axiosClient.put(`/api/todos/${todoId}/detail`, data);
  },
};
