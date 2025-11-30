'use client';

import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './login.module.css';
import { useAuth } from '../hooks';
import { requestNotificationPermission } from '../../notifications';

const Login: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const token = await requestNotificationPermission();
      await login({ email, password, firebaseId: token });
      router.push('/products');
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
    <div className={styles.appContainer}>
      <div className={styles.pageContainer}>
        <div className={styles.loginContainer}>
          <div className={styles.logoContainer}>
            <img src="/logo.svg" alt="Sentinel Logo" className={styles.logo} />
          </div>
          
          <h2 className={styles.title}>
            Вход в <span className={styles.titleGradient}>Sentinel</span>
          </h2>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Имейл адрес
              </label>
              <input
                id="email"
                type="email"
                className={styles.inputField}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Парола
              </label>
              <input
                id="password"
                type="password"
                className={styles.inputField}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`${styles.submitButton} ${isLoading ? styles.submitButtonDisabled : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Влизане...' : 'Влез'}
            </button>
          </form>

          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <a 
            href="/forgot-password" 
            className={styles.forgotPassword}
          >
            Забравена парола?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;