'use client'
import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useAuth } from './hooks';
import { styles } from './styles';
import { useRouter } from "next/navigation";
// import { requestNotificationPermission } from '../../notifications';

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
      router.push('dashboard')
    } catch (err) {
      setError('Неуспешен опит за вход. Моля, проверете вашите данни.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  const activeColor = '#0dcaf0';
  const defaultColor = '#6e8efb';

  return (
    <div style={styles.appContainer as React.CSSProperties}>
      <div style={styles.pageContainer as React.CSSProperties}>
        <div style={styles.loginContainer}>
          <div style={styles.logoContainer}>
            <img src="/logo.svg" alt="Sentinel Logo" style={styles.logo} />
          </div>
          
          <h2 style={styles.title}>
            Вход в Cortana
          </h2>
          
          <form onSubmit={handleSubmit} style={styles.loginForm as React.CSSProperties}>
            <div style={styles.inputGroup as React.CSSProperties}>
              <label htmlFor="email" style={styles.inputLabel}>
                Имейл адрес
              </label>
              <input
                id="email"
                type="email"
                style={styles.inputField}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required
              />
            </div>

            <div style={styles.inputGroup as React.CSSProperties}>
              <label htmlFor="password" style={styles.inputLabel}>
                Парола
              </label>
              <input
                id="password"
                type="password"
                style={styles.inputField}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonDisabled : {})
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Влизане...' : 'Влез'}
            </button>
          </form>

          {error && <div style={styles.errorMessage}>{error}</div>}
          
          <a 
            href="/forgot-password" 
            style={{
              ...styles.forgotPassword,
              color: defaultColor,
            }}
            onTouchStart={() => {
              const link = document.querySelector('a[href="/forgot-password"]');
              if (link) {
                (link as HTMLElement).style.color = activeColor;
              }
            }}
            onTouchEnd={() => {
              const link = document.querySelector('a[href="/forgot-password"]');
              if (link) {
                (link as HTMLElement).style.color = defaultColor;
              }
            }}
          >
            Забравена парола?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;