'use client';
import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useAuth } from './hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // const token = await requestNotificationPermission();
      await login({ email, password, firebaseId: 'token' });
      router.push('/dashboard');
    } catch (err) {
      setError('Неуспешен опит за вход. Моля, проверете вашите данни.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
    <main className="bg-white min-h-screen py-16 px-4">
      {/* Login Form Section (White) */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <img src="/logo.svg" alt="CortanaSoft Logo" className="w-32 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-[#0092b5]">Вход в Cortana</h2>
          <form onSubmit={handleSubmit} className="bg-[#0092b5] p-8 rounded-lg shadow-md text-white">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-lg font-semibold">
                Имейл адрес
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-lg font-semibold">
                Парола
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-bold text-[#0092b5] transition ${
                isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Влизане...' : 'Влез'}
            </button>
          </form>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </section>

      {/* Forgot Password Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white text-center">
        <div className="max-w-md mx-auto">
          <Link href="/forgot-password" className="text-white hover:underline text-lg">
            Забравена парола?
          </Link>
        </div>
      </section>

      {/* Call to Action Section (White) */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0092b5]">Още нямате акаунт?</h2>
          <Link
            href="/signup"
            className="inline-block bg-[#0092b5] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#007a99] transition"
          >
            Регистрирайте се сега
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;