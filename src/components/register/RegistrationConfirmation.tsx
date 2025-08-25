// RegistrationConfirmation.tsx
import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const ConfirmationContainer = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 48px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(110, 142, 251, 0.1);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: linear-gradient(135deg, #6e8efb20, #a777e320);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  
  svg {
    color: #6e8efb;
    width: 40px;
    height: 40px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 24px;
  color: #2d3748;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Message = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(110, 142, 251, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

const RegistrationConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />
      <PageContainer>
        <ConfirmationContainer>
          <IconContainer>
            <CheckCircle />
          </IconContainer>
          <Title>Регистрацията е <span>успешна!</span></Title>
          <Message>
            Благодарим ви, че се регистрирахте в Sentinel. Вашият акаунт е създаден успешно.
            <br /><br />
            Ще получите имейл за потвърждение на посочения от вас адрес. Моля, проверете входящата си поща и следвайте инструкциите, за да активирате акаунта си.
          </Message>
          <Button onClick={handleGoToHome}>
            Към вход страницата
          </Button>
        </ConfirmationContainer>
      </PageContainer>
      <Footer />
    </>
  );
};

export default RegistrationConfirmation;