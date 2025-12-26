'use client';

import { useCallback, useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useTodoActions } from '@/hooks/useTodoActions';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import TodoSearch from './TodoSearch';
import TodoPagination from './TodoPagination';
import styles from './TodoList.module.css';
import { useTodoDetail } from '@/api/detailTodo/useTodoDetail';
import TodoDetailPanel from './todoDetail/todoDetailPanel';
import { Modal } from 'antd';
import { TodoDetail } from '@/api/detailTodo/todoDetailApi';

export default function TodoList() {
  const {
    todos,
    keyword,
    setKeyword,
    currentPage,
    totalPages,
    loading,
    fetchTodos,
  } = useTodos();

  const {
    value,
    setValue,
    editingId,
    loading: actionLoading,
    addTodo,
    saveEdit,
    toggleCompleted,
    removeTodo,
    startEdit,
    cancelEdit,
  } = useTodoActions(fetchTodos, currentPage);

  const isLoading = loading || actionLoading;
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const detailState = useTodoDetail(selectedTodoId);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      fetchTodos(currentPage - 1);
    }
  }, [currentPage, fetchTodos]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      fetchTodos(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchTodos]);

  const onSave = (form: TodoDetail) => {
    detailState.saveDetail(form);
    setSelectedTodoId(null);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 Todo List</h2>

      {isLoading && <p>⏳ Loading...</p>}

      <TodoSearch value={keyword} onChange={setKeyword} />

      {editingId === null && (
        <TodoInput value={value} onChange={setValue} onAdd={addTodo} />
      )}

      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            editValue={value}
            onEditValueChange={setValue}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onToggleCompleted={toggleCompleted}
            onStartEdit={startEdit}
            onRemove={removeTodo}
            onClickItem={() => setSelectedTodoId(todo.id)}
          />
        ))}
      </ul>

      {todos.length === 0 && !isLoading && (
        <p className={styles.empty}>Không có todo</p>
      )}

      <TodoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <Modal
        open={!!selectedTodoId}
        title="Todo detail"
        footer={null}
        onCancel={() => setSelectedTodoId(null)}
      >
        {selectedTodoId && (
          <TodoDetailPanel
            detail={detailState.detail}
            loading={detailState.loading}
            onSave={onSave}
          />
        )}
      </Modal>



    </div>
  );
}
