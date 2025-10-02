'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingCart, Package, Truck, MapPin, BarChart, Settings, LogOut, SofaIcon } from 'lucide-react';
import { useCurrentCompany } from './hooks';
import { useUserRole } from './companies/[id]/hooks';
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