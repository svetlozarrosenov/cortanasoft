import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  background-color: #f0f8ff;
  min-height: calc(70vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ConfirmationContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #003366;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0066cc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #004c99;
  }
`;

const ConfirmationPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [confirmationStatus, setConfirmationStatus] = useState<'success' | 'error' | 'expired' | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const confirmRegistration = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
  
        if (!token) {
          setConfirmationStatus('error');
          setIsLoading(false);
          return;
        }
  
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACK_END_URL}/user/register/confirm?token=${token}`);
          setConfirmationStatus(response.data.status);
        } catch (error) {
          setConfirmationStatus('error');
        } finally {
          setIsLoading(false);
        }
      };
  
      confirmRegistration();
    }, []);
  
    const handleContinue = () => {
      navigate('/login');
    };
  
    const handleResendConfirmation = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_BACK_END_URL}/user/register/resend-confirmation`);
        alert('Нов линк за потвърждение е изпратен на вашия имейл адрес.');
      } catch (error) {
        alert('Възникна грешка при изпращането на нов линк. Моля, опитайте отново по-късно.');
      }
    };
  
    return (
      <>
        <Header />
        <PageContainer>
          <ConfirmationContainer>
            {isLoading ? (
              <Spinner />
            ) : confirmationStatus === 'success' ? (
              <>
                <Title>Успешно потвърждение на регистрацията</Title>
                <Message>Вашата регистрация беше успешно потвърдена. Вече можете да влезете в акаунта си.</Message>
                <Button onClick={handleContinue}>Продължи към вход</Button>
              </>
            ) : confirmationStatus === 'expired' ? (
              <>
                <Title>Възникна проблем при потвърждение на Вашата регистрация</Title>
                <Message>Изглежда, че линкът за потвърждение е изтекъл. Желаете ли да получите нов линк?</Message>
                <Button onClick={handleResendConfirmation}>Изпрати нов линк за потвърждение</Button>
              </>
            ) : (
              <>
              <Title>Възникна проблем при потвърждение на Вашата регистрация</Title>
                <Message>Моля, опитайте отново или се свържете с поддръжката.</Message>
                <Button onClick={() => navigate('/')}>Върни се към начало</Button>
              </>
            )}
          </ConfirmationContainer>
        </PageContainer>
        <Footer />
      </>
    );
  };
  
  export default ConfirmationPage;