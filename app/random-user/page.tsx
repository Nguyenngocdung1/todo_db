'use client';

import { useState, useEffect } from 'react';
import RandomNameWheel from '@/components/randomUser/RandomNameWheel';
import AddUserForm from '@/components/randomUser/AddUserForm';
import ResultModal from '@/components/randomUser/ResultModal';
import styles from './page.module.css';

type LocalUser = {
  id: number;
  username: string;
};

const STORAGE_KEY = 'random_users';

export default function RandomUserPage() {
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem(STORAGE_KEY);
    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        // Migrate old data format (with email) to new format
        const migrated = parsed.map((user: any) => ({
          id: user.id,
          username: user.username,
        }));
        setUsers(migrated);
      } catch (error) {
        console.error('Error loading users from localStorage:', error);
      }
    }
  }, []);

  // Save users to localStorage whenever users change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [users]);

  const handleAddUser = (username: string) => {
    const newUser: LocalUser = {
      id: Date.now(), // Simple ID generation
      username,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleSpin = () => {
    if (users.length === 0) {
      alert('Vui lòng thêm ít nhất một người dùng trước khi quay!');
      return;
    }
    setIsSpinning(true);
  };

  const handleSpinComplete = (selectedName: string) => {
    setIsSpinning(false);
    setResult(selectedName);
    setShowResultModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎲 Quay Random Tên</h1>
        <p className={styles.subtitle}>
          Thêm người dùng và quay random để chọn người may mắn!
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <AddUserForm onSuccess={handleAddUser} />
        </div>

        <div className={styles.rightPanel}>
          <RandomNameWheel
            users={users}
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
            onSpin={handleSpin}
          />
        </div>
      </div>

      <ResultModal
        open={showResultModal}
        result={result}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  );
}
