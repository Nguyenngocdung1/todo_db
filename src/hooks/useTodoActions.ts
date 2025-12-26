import { useState, useCallback } from 'react';
import { todoApi, Todo } from '@/api/todoApi';
import { toastError } from '@/utils/toast';

export function useTodoActions(
  fetchTodos: (page: number) => Promise<void>,
  currentPage: number
) {
  const [value, setValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const addTodo = useCallback(async () => {
    if (!value.trim()) return;

    try {
      setLoading(true);
      await todoApi.create(value.trim());
      setValue('');
      await fetchTodos(1);
    } catch (e: unknown) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  }, [value, fetchTodos]);

  const saveEdit = useCallback(async () => {
    if (editingId === null || !value.trim()) return;

    try {
      await todoApi.update(editingId, { title: value });
      setEditingId(null);
      setValue('');
      await fetchTodos(currentPage);
    } catch (e: unknown) {
      toastError(e);
    }
  }, [editingId, value, currentPage, fetchTodos]);

  const toggleCompleted = useCallback(async (todo: Todo) => {
    try {
      await todoApi.update(todo.id, { completed: !todo.completed });
      await fetchTodos(currentPage);
    } catch (e: unknown) {
      toastError(e);
    }
  }, [currentPage, fetchTodos]);

  const removeTodo = useCallback(async (id: number) => {
    try {
      await todoApi.delete(id);
      await fetchTodos(currentPage);
    } catch (e: unknown) {
      toastError(e);
    }
  }, [currentPage, fetchTodos]);

  const startEdit = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setValue(todo.title);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setValue('');
  }, []);

  return {
    value,
    setValue,
    editingId,
    loading,
    addTodo,
    saveEdit,
    toggleCompleted,
    removeTodo,
    startEdit,
    cancelEdit,
  };
}

