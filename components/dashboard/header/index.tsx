'use client';
import React from 'react';
import styles from './dashboard-header.module.css';
import { useCurrentCompany } from '@/app/dashboard/hooks';
import Profile from '../profile';

const DashboardHeader: React.FC = () => {
  const {company} = useCurrentCompany();

  return (
    <div className={styles.header}>
      <p className={styles.company}>{company?.name}</p>

      <Profile />
    </div>
  );
};

export default DashboardHeader;