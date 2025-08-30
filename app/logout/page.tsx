'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../login/hooks';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      try {
        await logout(); // Извиква POST /auth/logout и инвалидира SWR кеша
        router.push('/login'); // Пренасочва към /login
      } catch (error) {
        console.error('Logout error:', error);
        router.push('/login'); // Пренасочва дори при грешка
      }
    }

    handleLogout();
  }, [logout, router]);

  return <div>Logging out...</div>;
}