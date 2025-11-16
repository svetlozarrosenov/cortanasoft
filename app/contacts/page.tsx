'use client'; // За клиентски състояния като useState

import React, { useState, FormEvent } from 'react';
import styles from './contacts.module.css'; // Импорт на CSS модула
import Intro from '@/components/Intro';
import { addContactMessageMutate } from './hooks';

const Contacts: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await addContactMessageMutate({ name, email, phone, subject, message });
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setError('Грешка при изпращане на съобщението. Моля, опитайте отново.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Intro />
      <div className={styles.pageContainer}>
        <section className={styles.contentSection}>
          <h1 className={styles.title}>Контакти</h1>
          <div className={styles.contentContainer}>
            <div className={styles.contactInfo}>
              <h2 className={styles.contactTitle}>Свържете се с нас</h2>
              <p className={styles.contactDetail}>Телефон: +359 87 664 9967</p>
              <p className={styles.contactDetail}>Email: sentinel@sentinel-bg.info</p>
            </div>

            <div className={styles.contactInfo}>
              <h2 className={styles.contactTitle}>Работно време</h2>
              <p className={styles.contactDetail}>Понеделник - Петък: 9:00 - 18:00</p>
              <p className={styles.contactDetail}>Събота: 10:00 - 14:00</p>
              <p className={`${styles.contactDetail} ${styles.contactDetailLast}`}>Неделя: Почивен ден</p>
            </div>

            {!isSubmitted ? (
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <h2 className={styles.contactTitle}>Изпратете ни съобщение</h2>
                <input
                  type="text"
                  placeholder="Вашето име"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="email"
                  placeholder="Вашият имейл"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Телефон"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Тема"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={styles.input}
                />
                <textarea
                  placeholder="Вашето съобщение"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.textarea}
                />
                <button
                  type="submit"
                  className={styles.button}
                >
                  Изпрати
                </button>
                {error && <p className={styles.errorMessage}>{error}</p>}
              </form>
            ) : (
              <div className={styles.successMessage}>
                Вашето съобщение беше изпратено успешно! Благодарим ви, че се свързахте с нас. Ще ви отговорим възможно най-скоро на посочения имейл или телефон.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contacts;