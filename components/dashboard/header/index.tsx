'use client';
import React from 'react';
import styles from './dashboard-header.module.css';
import { useCurrentCompany } from '@/app/dashboard/hooks';
import Profile from '../profile';
import { HiMenu } from 'react-icons/hi';
import { useSidebar } from '@/components/context/SidebarContext';

const DashboardHeader: React.FC = () => {
  const {company} = useCurrentCompany();
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.header}>
      <HiMenu onClick={toggleSidebar} className={styles.burger} />

      <p className={styles.company}>{company?.name}</p>

      <Profile />
    </div>
  );
};

export default DashboardHeader;