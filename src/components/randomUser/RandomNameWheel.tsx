'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import styles from './RandomNameWheel.module.css';

type LocalUser = {
  id: number;
  username: string;
};

type Props = {
  users: LocalUser[];
  isSpinning: boolean;
  onSpin: () => void;
  onSpinComplete: (selectedName: string) => void;
};

export default function RandomNameWheel({
  users,
  isSpinning,
  onSpin,
  onSpinComplete,
}: Props) {
  const [displayNames, setDisplayNames] = useState<string[]>([]);
  const [maxLength, setMaxLength] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (users?.length > 0) {
      const names = users.map((user) => user.username);
      const max = Math.max(...names.map((name) => name.length));
      setMaxLength(max);
      if (!isSpinning) {
        setDisplayNames(names);
      }
    }
  }, [users, isSpinning]);

  useEffect(() => {
    if (!isSpinning) {
      setSelectedIndex(null);
      if (users?.length > 0) {
        const names = users.map((user) => user.username);
        setDisplayNames(names);
      }
      return;
    }

    // Chọn người thắng cuộc ngay từ đầu
    if (!users || users.length === 0) return;
    
    const selectedIdx = Math.floor(Math.random() * users.length);
    setSelectedIndex(selectedIdx);
    const selectedName = users[selectedIdx].username;

    // Tạo mảng để lưu trữ các chữ cái đang quay cho mỗi vị trí
    const charPositions: string[][] = Array(maxLength).fill(null).map(() => []);

    // Animation quay từng chữ cái cùng lúc
    let frameCount = 0;
    const maxFrames = 30; // Số frame quay

    const interval = setInterval(() => {
      frameCount++;
      
      // Tạo các tên random cho tất cả user
      const newDisplayNames = users.map((user, userIdx) => {
        if (userIdx === selectedIdx && frameCount > maxFrames - selectedName.length) {
          // Bắt đầu hiển thị tên được chọn từng chữ cái
          const revealIndex = maxFrames - frameCount;
          if (revealIndex >= 0 && revealIndex < selectedName.length) {
            return selectedName
              .substring(0, revealIndex + 1)
              .padEnd(maxLength, ' ');
          }
        }
        
        // Tạo tên random
        const randomChars = Array(maxLength)
          .fill(null)
          .map(() => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            return chars[Math.floor(Math.random() * chars.length)];
          });
        return randomChars.join('');
      });

      setDisplayNames(newDisplayNames);

      // Dừng sau khi quay đủ và hiển thị đầy đủ tên được chọn
      if (frameCount >= maxFrames) {
        clearInterval(interval);
        // Hiển thị tên đầy đủ của user được chọn
        const finalNames = users.map((user, idx) => {
          if (idx === selectedIdx) {
            return selectedName.padEnd(maxLength, ' ');
          }
          return user.username.padEnd(maxLength, ' ');
        });
        setDisplayNames(finalNames);
        
        setTimeout(() => {
          onSpinComplete(selectedName);
        }, 500);
      }
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, [isSpinning, users, maxLength, onSpinComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.wheelContainer}>
        <div className={styles.wheel}>
          {displayNames.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Chưa có người dùng nào</p>
              <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 8 }}>
                Vui lòng thêm người dùng để bắt đầu quay
              </p>
            </div>
          ) : (
            displayNames.map((name, index) => (
              <div
                key={index}
                className={`${styles.slot} ${
                  isSpinning ? styles.spinning : ''
                } ${
                  selectedIndex === index && !isSpinning ? styles.selected : ''
                }`}
              >
                {Array(maxLength)
                  .fill(null)
                  .map((_, charIndex) => {
                    const char = name[charIndex] || ' ';
                    return (
                      <span
                        key={charIndex}
                        className={`${styles.char} ${
                          isSpinning ? styles.spinningChar : ''
                        }`}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    );
                  })}
              </div>
            ))
          )}
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        onClick={onSpin}
        disabled={isSpinning || users?.length === 0}
        loading={isSpinning}
        className={styles.spinButton}
        style={{
          background: isSpinning
            ? '#94a3b8'
            : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: 'none',
          fontWeight: 600,
          fontSize: 18,
          padding: '12px 48px',
          height: 'auto',
        }}
      >
        {isSpinning ? 'Đang quay...' : '🎲 Quay Random'}
      </Button>

      {users?.length > 0 && (
        <p className={styles.userCount}>
          Tổng số người dùng: <strong>{users?.length}</strong>
        </p>
      )}
    </div>
  );
}
