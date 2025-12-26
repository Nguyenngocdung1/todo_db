'use client';

import { memo } from 'react';
import styles from './TodoList.module.css';

type TodoInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder?: string;
};

const TodoInput = memo(function TodoInput({
  value,
  onChange,
  onAdd,
  placeholder = '➕ Nhập todo',
}: TodoInputProps) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onAdd()}
      placeholder={placeholder}
    />
  );
});

export default TodoInput;

