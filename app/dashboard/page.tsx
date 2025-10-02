import React from 'react';
import DashboardBoxes from '@/components/dashboard/boxes';
import Chart from '@/components/dashboard/chart';

export default function DashboardPage() {


  return (
    <div>
      <DashboardBoxes />

      <Chart />
    </div>
  );
}