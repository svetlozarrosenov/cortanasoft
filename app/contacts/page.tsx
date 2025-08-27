'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import styles from './contacts.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Изпращане...');
    
    try {
      // Пример за API извикване (заменете с вашия endpoint)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('Съобщението е изпратено успешно!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Грешка при изпращане. Моля, опитайте отново.');
      }
    } catch (error) {
      setStatus('Грешка при изпращане. Моля, опитайте отново.');
    }
  };

  return (
    <>
      <Head>
        <title>Контакти - CortanaSoft ERP</title>
        <meta name="description" content="Свържете се с нас за повече информация относно нашите ERP решения." />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Свържете се с нас</h1>
        <p className={styles.description}>
          Имате въпроси или искате да научите повече за нашите ERP решения? Попълнете формата по-долу или се свържете директно с нас.
        </p>
        <form className={styles.contact} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Име</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
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
            <label htmlFor="message">Съобщение</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Изпрати
          </button>
          {status && <p className={styles.status}>{status}</p>}
        </form>
        <div className={styles.contact}>
          <p>Други начини за връзка:</p>
          <p>Телефон: <a href="tel:+359886801802" className={styles.contactLink}>+359 886 801 802</a></p>
          <p>Email: <a href="mailto:sales@cortanaSoft.com" className={styles.contactLink}>sales@cortanaSoft.com</a></p>
        </div>
      </div>
    </>
  );
};

export default Contact;