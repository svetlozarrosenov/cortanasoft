'use client'
import React from 'react';
import { useUser } from '../login/hooks';
import { useActiveTasks } from './tasks/hooks';
import Link from 'next/link';
import { useClients } from './clients/hooks';
import { useActiveOrders, useRevenue } from './orders/hooks';

export default function DashboardPage() {
  const { user } = useUser();
  const { tasks } = useActiveTasks();
  const { clients } = useClients();
  const { orders } = useActiveOrders();
  const { revenue } =  useRevenue();

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-2">Месечен приход</h2>
          <p className="text-2xl font-bold">
            {revenue ? `${revenue?.totalRevenue?.toLocaleString()} лева` : 'N/A'}
          </p>
          <p className="text-sm text-gray-100 mt-2">
            Общ приход за {new Date().toLocaleString('default', { month: 'long' })}.
          </p>
        </div>

        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-2">Поръчки за месеца</h2>
          <p className="text-2xl font-bold">
            {revenue?.orders?.length}
          </p>
          <p className="text-sm text-gray-100 mt-2">
            Общ брой поръчки за {new Date().toLocaleString('default', { month: 'long' })}.
          </p>
        </div>
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <Link
                href="/dashboard/tasks">
          <h2 className="text-lg font-semibold mb-2">Текущи задачи</h2>
          <p className="text-2xl font-bold">{tasks?.length || 0}</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-100">
            {tasks?.length ? (
              tasks?.slice(0, 3).map((task: any, key: any) => (
                <li key={key}>{task.title}</li>
              ))
            ) : (
              <li key={'no_tasks'}>Няма налични задачи</li>
            )}
          </ul>
          </Link>
        </div>
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <Link href="/dashboard/clients">
            <h2 className="text-lg font-semibold mb-2">Статистика за клиенти</h2>
            <p className="text-2xl font-bold">{clients?.length || 0}</p>
            <p className="text-sm text-gray-100 mt-2">Общо активни клиенти.</p>
          </Link>
        </div>
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <Link href="/dashboard/orders">
            <h2 className="text-lg font-semibold mb-2">Активни поръчки</h2>
            <p className="text-2xl font-bold">{orders?.length || 0}</p>
            <p className="text-sm text-gray-100 mt-2">Поръчки в процес на изпълнение.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}