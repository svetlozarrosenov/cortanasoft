'use client'
import React from 'react';
import { useUser } from '../login/hooks';

export default function DashboardPage() {
  const { user } = useUser();
  console.log('crb_user', user);
  let revenue = null;
  let tasks = [];
  let customers = null;

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-2">Месечен приход</h2>
          <p className="text-2xl font-bold">
            {revenue ? `$${revenue?.total?.toLocaleString()}` : 'N/A'}
          </p>
          <p className="text-sm text-gray-100 mt-2">
            Общ приход за {new Date().toLocaleString('default', { month: 'long' })}.
          </p>
        </div>
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-2">Текущи задачи</h2>
          <p className="text-2xl font-bold">{tasks.length || 0}</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-100">
            {tasks.length ? (
              tasks.slice(0, 3).map((task) => (
                <li key={task.id}>{task.title}</li>
              ))
            ) : (
              <li>Няма налични задачи</li>
            )}
          </ul>
        </div>
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-2">Статистика за клиенти</h2>
          <p className="text-2xl font-bold">{customers?.total || 0}</p>
          <p className="text-sm text-gray-100 mt-2">Общо активни клиенти.</p>
        </div>
        <div className="bg-[#0092b5] text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-2">Активни поръчки</h2>
          <p className="text-2xl font-bold">{revenue?.activeOrders || 0}</p>
          <p className="text-sm text-gray-100 mt-2">Поръчки в процес на изпълнение.</p>
        </div>
      </div>
    </div>
  );
}