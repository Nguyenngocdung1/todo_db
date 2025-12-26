import { useEffect, useState, useCallback, useRef } from 'react';
import { todoApi, Todo } from '@/api/todoApi';
import { toastError } from '@/utils/toast';

const PAGE_SIZE = 5;

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const keywordRef = useRef(keyword);

  useEffect(() => {
    keywordRef.current = keyword;
  }, [keyword]);

  const fetchTodos = useCallback(async (page = 1, searchKeyword?: string) => {
    const searchKey = searchKeyword ?? keywordRef.current;
    try {
      setLoading(true);
      const res = await todoApi.getAll(page, PAGE_SIZE, searchKey);
      setTodos(res.data.items);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.page);
    } catch (e: unknown) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos(1, keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return {
    todos,
    keyword,
    setKeyword,
    currentPage,
    totalPages,
    loading,
    fetchTodos,
  };
}

