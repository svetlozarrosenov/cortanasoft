'use client';

import React, { useState } from 'react';
import styles from './register.module.css';
import { useRegisterMutate } from '@/app/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      throw new Error('passwords must match')
    }
    await useRegisterMutate({
      firstName,
      middleName,
      lastName,
      phone,
      country,
      city,
      address,
      email,
      password
    });
    router.push('/registration-confirmation')
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.registerContainer}>
          <h2 className={styles.title}>Регистрация в <span>Sentinel</span></h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName" className={styles.label}>Име</label>
              <input
                id="firstName"
                type="text"
                placeholder="Въведете име"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="middleName" className={styles.label}>Презиме</label>
              <input
                id="middleName"
                type="text"
                placeholder="Въведете презиме"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName" className={styles.label}>Фамилия</label>
              <input
                id="lastName"
                type="text"
                placeholder="Въведете фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Имейл адрес</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>Телефонен номер</label>
              <input
                id="phone"
                type="tel"
                placeholder="+359 888 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="country" className={styles.label}>Държава</label>
              <input
                id="country"
                type="text"
                placeholder="Въведете държава"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.label}>Град</label>
              <input
                id="city"
                type="text"
                placeholder="Въведете град"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="address" className={styles.label}>Адрес</label>
              <input
                id="address"
                type="text"
                placeholder="Въведете адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Парола</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Потвърди парола</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>Регистрирай се</button>
          </form>
          <Link href="/login" className={styles.loginLink}>Вече имате акаунт? Влезте тук</Link>
        </div>
      </div>
    </>
  );
};

export default Register;