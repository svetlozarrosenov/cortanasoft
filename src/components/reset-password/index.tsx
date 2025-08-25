import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { confirmPasswordReset } from './hooks';

const Styles = {
  PageContainer: styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media (max-width: 768px) {
      padding: 10px;
    }
  `,
  ContentContainer: styled.div`
    background: white;
    border-radius: 20px;
    padding: 48px;
    margin: 32px 0;
    text-align: center;
    border: 1px solid rgba(110, 142, 251, 0.1);
    max-width: 500px;
    width: 100%;
    align-self: center;
    
    @media (max-width: 768px) {
      padding: 24px 16px;
      margin: 20px 0;
      border-radius: 12px;
    }
  `,
  Title: styled.h1`
    font-size: 2.5rem;
    color: #2d3748;
    margin-bottom: 20px;
    
    span {
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
      line-height: 1.3;
      margin-bottom: 16px;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    @media (max-width: 768px) {
      gap: 16px;
    }
  `,
  Input: styled.input`
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid rgba(110, 142, 251, 0.3);
    font-size: 1rem;
    color: #4a5568;
    
    &:focus {
      outline: none;
      border-color: #6e8efb;
      box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
    }
    
    @media (max-width: 768px) {
      padding: 14px 16px;
      border-radius: 8px;
    }
  `,
  Button: styled.button`
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    border: none;
    padding: 16px 48px;
    font-size: 1.1rem;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    
    &:hover {
      background: linear-gradient(135deg, #5d7de8, #9566d0);
    }
    
    @media (max-width: 768px) {
      padding: 16px;
      font-size: 1rem;
      border-radius: 8px;
    }
  `,
  Message: styled.p`
    font-size: 1rem;
    color: #4a5568;
    margin-top: 20px;
    
    &.error {
      color: #e53e3e;
    }
    
    &.success {
      color: #28a745;
    }
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
      margin-top: 16px;
    }
  `,
};

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage('Невалиден или липсващ токен за възстановяване.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Паролите не съвпадат. Моля, проверете ги.');
      return;
    }

    try {
      await confirmPasswordReset(token, newPassword, confirmPassword);
      setMessage('Паролата е успешно сменена! Ще бъдете пренасочени към вход.');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Грешка при смяната на паролата. Моля, опитайте отново.'
      );
    }
  };

  return (
    <>
      <Header />
      <Styles.PageContainer>
        <Styles.ContentContainer>
          <Styles.Title>
            Смяна на <span>парола</span>
          </Styles.Title>
          <Styles.Form onSubmit={handleSubmit}>
            <Styles.Input
              type="password"
              placeholder="Въведете новата парола"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Styles.Input
              type="password"
              placeholder="Повторете новата парола"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Styles.Button type="submit">Смени парола</Styles.Button>
          </Styles.Form>
          {message && (
            <Styles.Message
              className={
                message.includes('успешно') ? 'success' : 'error'
              }
            >
              {message}
            </Styles.Message>
          )}
        </Styles.ContentContainer>
      </Styles.PageContainer>
      <Footer />
    </>
  );
};

export default ResetPassword;