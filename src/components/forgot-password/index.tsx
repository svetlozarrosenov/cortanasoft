import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../header';
import Footer from '../Footer';
import { resetPasswordMutate } from './hooks';

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
  Message: styled.p`
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 24px;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
      line-height: 1.5;
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
  SuccessMessage: styled.div`
    background: linear-gradient(135deg, #6e8efb08, #a777e308);
    padding: 20px;
    border-radius: 12px;
    margin-top: 24px;
    font-size: 1rem;
    color: #4a5568;
    
    @media (max-width: 768px) {
      padding: 16px;
      margin-top: 16px;
      font-size: 0.95rem;
    }
  `,
};

const StyledLink = styled(RouterLink)`
  color: #6e8efb;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 20px;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-top: 16px;
  }
`;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPasswordMutate(email);
      setIsSubmitted(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Грешка:', error);
      setErrorMessage('Грешка при изпращане на линка. Моля, опитайте отново.');
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <Header />
      <Styles.PageContainer>
        <Styles.ContentContainer>
          <Styles.Title>
            Възстановяване на <span>парола</span>
          </Styles.Title>
          {!isSubmitted ? (
            <>
              <Styles.Message>
                Въведете имейл адреса, свързан с Вашия акаунт, и ние ще Ви изпратим линк за възстановяване на паролата.
              </Styles.Message>
              <Styles.Form onSubmit={handleSubmit}>
                <Styles.Input
                  type="email"
                  placeholder="Въведете Вашия имейл"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Styles.Button type="submit">
                  Изпрати линк
                </Styles.Button>
              </Styles.Form>
              {errorMessage && (
                <Styles.Message style={{ color: '#e53e3e' }}>
                  {errorMessage}
                </Styles.Message>
              )}
              <StyledLink to="/login">
                Върнете се към вход
              </StyledLink>
            </>
          ) : (
            <Styles.SuccessMessage>
              Линк за възстановяване на паролата беше изпратен успешно на {email}. 
              Моля, проверете имейла си (включително папката „Спам“).
            </Styles.SuccessMessage>
          )}
        </Styles.ContentContainer>
      </Styles.PageContainer>
      <Footer />
    </>
  );
};

export default ForgotPassword;