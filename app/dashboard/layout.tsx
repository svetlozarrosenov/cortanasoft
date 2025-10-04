'use client'
import Sidebar from '@/components/dashboard/sidebar';
import styles from './dashboard.module.css';
import DashboardHeader from '@/components/dashboard/header';
import DashboardFooter from '@/components/dashboard/footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboard}>
      <Sidebar className={styles.sidebar} />
      
      <div className={styles.dashboardInner}>
        <DashboardHeader/>

        <div className={styles.content}>
          {children}
        </div>

        <DashboardFooter/>
    </div>
    </div>
  );
}