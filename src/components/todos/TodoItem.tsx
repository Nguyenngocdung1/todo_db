'use client';

import { memo } from 'react';
import { Todo } from '@/api/todoApi';
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import styles from './TodoList.module.css';

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  editValue: string;
  onEditValueChange: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onToggleCompleted: (todo: Todo) => void;
  onStartEdit: (todo: Todo) => void;
  onRemove: (id: number) => void;
  onClickItem: (id: number) => void;
};

const TodoItem = memo(function TodoItem({
  todo,
  isEditing,
  editValue,
  onEditValueChange,
  onSaveEdit,
  onCancelEdit,
  onToggleCompleted,
  onStartEdit,
  onRemove,
  onClickItem,
}: TodoItemProps) {
  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleCompleted(todo)}
      />

      {isEditing ? (
        <input
          className={styles.editInput}
          value={editValue}
          autoFocus
          onChange={(e) => onEditValueChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSaveEdit();
            if (e.key === 'Escape') onCancelEdit();
          }}
        />
      ) : (
        <span
          className={styles.title}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.title}
        </span>
      )}

      <div className={styles.actions}>
        <Tooltip title="Xem chi tiết">
          <button
            className={`${styles.iconBtn} ${styles.detailBtn}`}
            onClick={() => onClickItem(todo.id)}
          >
            <FileTextOutlined />
          </button>
        </Tooltip>

        <Tooltip title="Sửa tiêu đề">
          <button
            className={`${styles.iconBtn} ${styles.editBtn}`}
            onClick={() => onStartEdit(todo)}
          >
            <EditOutlined />
          </button>
        </Tooltip>

        <Tooltip title="Xóa">
          <button
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onRemove(todo.id)}
          >
            <DeleteOutlined />
          </button>
        </Tooltip>
      </div>
    </li>
  );
});

export default TodoItem;
