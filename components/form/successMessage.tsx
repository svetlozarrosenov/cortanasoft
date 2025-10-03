'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './success-message.module.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface SuccessMessageInterface {
  message: string;
  title: string;
  visible: any;
  setIsVisible: any
}

export default function SuccessMessage({ title, message, visible, setIsVisible }: SuccessMessageInterface) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && visible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(timer)
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mounted, visible]);

  if (!mounted || !visible) {
    return null;
  }

  return createPortal(
    <div className={styles.success}>
      <AiOutlineCheckCircle className={styles.icon} />
      
      <div className={styles.inner}>
          <h4 className={styles.title}>{title}</h4>

          <p className={styles.content}>{message}</p>
      </div>
    </div>, 
    document.body
  );
}