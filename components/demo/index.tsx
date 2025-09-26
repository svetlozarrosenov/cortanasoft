'use client'
import React, { useState } from 'react';
import styles from './demo.module.css';
import Shell from '../shell';

const SuccessSection: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.demo}>
      <Shell>
        <div className={styles.demoInner}>
          <h3 className={styles.demoTitle}>The starter package starts at only 200 BGN per month!</h3>
          <p className={styles.demoContent}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,</p>

          <button className={styles.demoButton}>Request Demo and Learn More</button>
        </div>
      </Shell>
    </div>
  );
};

export default SuccessSection;