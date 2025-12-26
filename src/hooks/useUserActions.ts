import { useState, useCallback } from 'react';
import { userApi, User } from '@/api/userApi';
import { toastError } from '@/utils/toast';

export function useUserActions(fetchUsers: () => Promise<void>) {
  const [loading, setLoading] = useState(false);

  const createUser = useCallback(async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await userApi.create(data);
      await fetchUsers();
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (
    id: number,
    data: Partial<Pick<User, 'email' | 'detail'>>
  ) => {
    try {
      await userApi.update(id, data);
      await fetchUsers();
    } catch (e) {
      toastError(e);
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id: number) => {
    try {
      await userApi.delete(id);
      await fetchUsers();
    } catch (e) {
      toastError(e);
    }
  }, [fetchUsers]);

  const updateAllTodosStatus = useCallback(async (
    userId: number,
    completed: boolean
  ) => {
    try {
      await userApi.updateAllTodosStatus(userId, completed);
    } catch (e) {
      toastError(e);
    }
  }, []);

  return {
    loading,
    createUser,
    updateUser,
    deleteUser,
    updateAllTodosStatus,
  };
}
