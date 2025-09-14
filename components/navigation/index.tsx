'use client';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/app/login/hooks';

const Navigation: React.FC = () => {
  const { user } = useUser();

  return (
    <nav>
      <ul className="flex flex-col md:flex-row gap-6 text-white text-lg font-semibold">
        {user && (
          <li>
            <Link href="/dashboard" className="hover:text-gray-100 transition">
              Дашборд
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link href="/" className="hover:text-gray-100 transition">
              Начало
            </Link>
          </li>
        )}
        <li>
          <Link href="/about" className="hover:text-gray-100 transition">
            За нас
          </Link>
        </li>
        <li>
          <Link href="/contacts" className="hover:text-gray-100 transition">
            Контакти
          </Link>
        </li>
        {!user && (
          <li>
            <Link href="/login" className="hover:text-gray-100 transition">
              Влизане
            </Link>
          </li>
        )}
        {user && (
          <li className="text-white">
            Здравейте, {user.firstName}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;