'use client';

import { memo } from 'react';
import styles from './TodoList.module.css';

type TodoPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const TodoPagination = memo(function TodoPagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: TodoPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        ◀ Prev
      </button>
      <span>
        Page {currentPage} / {totalPages}
      </span>
      <button
        className={styles.pageBtn}
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next ▶
      </button>
    </div>
  );
});

export default TodoPagination;

