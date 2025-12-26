import { useEffect, useState } from 'react';
import { todoDetailApi, TodoDetail } from '@/api/detailTodo/todoDetailApi';

export function useTodoDetail(todoId: number | null) {
    const [detail, setDetail] = useState<TodoDetail | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!todoId) return;
        debugger
        let cancelled = false;

        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await todoDetailApi.getDetail(todoId);
                if (!cancelled) {
                    setDetail(res);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchDetail();

        return () => {
            cancelled = true;
        };
    }, [todoId]);


    const saveDetail = async (data: TodoDetail) => {
        if (!todoId) return;

        const res = await todoDetailApi.saveOrUpdate(todoId, data);
        setDetail(res.data);
    };

    return {
        detail,
        setDetail,
        loading,
        saveDetail,
    };
}
