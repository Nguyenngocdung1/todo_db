'use client';

import { memo } from 'react';
import styles from './TodoList.module.css';

type TodoSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const TodoSearch = memo(function TodoSearch({
  value,
  onChange,
  placeholder = '🔍 Tìm kiếm',
}: TodoSearchProps) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
});

export default TodoSearch;

