'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './login.module.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Изпращане...');

    try {
      // Пример за API извикване (заменете с вашия endpoint)
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Вход успешен! Пренасочване...');
        // Добавете пренасочване или логика след успешен вход
      } else {
        setStatus('Грешка при вход. Моля, проверете данните.');
      }
    } catch (error) {
      setStatus('Грешка при вход. Моля, опитайте отново.');
    }
  };

  return (
    <>
      <Head>
        <title>Вход - CortanaSoft ERP</title>
        <meta name="description" content="Влезте в системата на CortanaSoft ERP за достъп до вашите бизнес инструменти." />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Вход в системата</h1>
        <p className={styles.description}>
          Моля, въведете вашите данни за вход. Ако имате проблеми, <Link href="/contacts" className={styles.contactLink}>свържете се с нас</Link>.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Парола</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Вход
          </button>
          {status && <p className={styles.status}>{status}</p>}
        </form>
        <div className={styles.contact}>
          <p>Нямате акаунт? <Link href="/contacts" className={styles.contactLink}>Свържете се за регистрация</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;