'use client';

import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import styles from './ResultModal.module.css';

type Props = {
  open: boolean;
  result: string | null;
  onClose: () => void;
};

export default function ResultModal({ open, result, onClose }: Props) {
  const [displayText, setDisplayText] = useState('');
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    if (open && result) {
      setShowFullText(false);
      setDisplayText('');
      
      // Animation hiển thị từng chữ cái
      const chars = result.split('');
      chars.forEach((char, index) => {
        setTimeout(() => {
          setDisplayText((prev) => prev + char);
          if (index === chars.length - 1) {
            setTimeout(() => setShowFullText(true), 300);
          }
        }, index * 100);
      });
    } else {
      setDisplayText('');
      setShowFullText(false);
    }
  }, [open, result]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className={styles.modal}
      styles={{
        content: {
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          borderRadius: '20px',
          padding: '40px',
        },
      }}
    >
      <div className={styles.content}>
        <div className={styles.icon}>🎉</div>
        <h2 className={styles.title}>Chúc mừng!</h2>
        <div className={styles.resultContainer}>
          <p className={styles.label}>Người được chọn:</p>
          <div className={styles.result}>
            {displayText.split('').map((char, index) => (
              <span
                key={index}
                className={`${styles.resultChar} ${showFullText ? styles.visible : ''}`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Đóng
        </button>
      </div>
    </Modal>
  );
}
