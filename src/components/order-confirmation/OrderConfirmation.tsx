import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { FaCheckCircle } from 'react-icons/fa';

// Стилове, адаптирани от Home
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
    
    @media (max-width: 768px) {
      padding: 24px 16px;
      margin: 20px 0;
      border-radius: 12px;
    }
  `,
  ConfirmationIcon: styled.div`
    margin-bottom: 20px;
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
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 16px;
    }
  `,
  InfoBox: styled.div`
    background: linear-gradient(135deg, #6e8efb08, #a777e308);
    border-radius: 16px;
    padding: 24px;
    margin: 32px 0;
    
    @media (max-width: 768px) {
      padding: 16px;
      margin: 20px 0;
      border-radius: 12px;
    }
  `,
  InfoTitle: styled.h2`
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 20px;
    
    span {
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 16px;
    }
  `,
  InfoList: styled.ul`
    list-style-type: none;
    padding: 0;
    color: #4a5568;
    font-size: 1rem;
    line-height: 1.6;
    
    li {
      margin-bottom: 16px;
      padding-left: 28px;
      position: relative;
      
      &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #6e8efb;
        font-weight: bold;
      }
    }
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
      line-height: 1.5;
      
      li {
        margin-bottom: 12px;
        padding-left: 24px;
      }
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 40px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
      margin-top: 24px;
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
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px;
      font-size: 1rem;
      border-radius: 8px;
    }
  `,
};

const OrderConfirmation: React.FC = () => {
  return (
    <>
      <Header />
      <Styles.PageContainer>
        <Styles.ContentContainer>
          <Styles.ConfirmationIcon>
            <FaCheckCircle size={60} color="#6e8efb" /> {/* Промених цвета на иконата да съответства на градиента */}
          </Styles.ConfirmationIcon>
          <Styles.Title>
            Благодарим за Вашата <span>поръчка</span>!
          </Styles.Title>
          <Styles.Message>
            Вашата поръчка е успешно приета и обработена. Поръчаните устройства вече са свързани с профила Ви в нашата система.
          </Styles.Message>
          <Styles.Message>
            Очаквайте скоро обаждане от наш консултант за потвърждение на поръчката и уточняване на детайлите по доставката.
          </Styles.Message>
          <Styles.InfoBox>
            <Styles.InfoTitle>Какво <span>следва</span>?</Styles.InfoTitle>
            <Styles.InfoList>
              <li>Ще получите имейл с потвърждение на поръчката.</li>
              <li>Наш консултант ще се свърже с Вас в рамките на 24 часа.</li>
              <li>След потвърждение, ще подготвим устройствата за изпращане.</li>
              <li>Ще Ви уведомим, когато поръчката е изпратена, с информация за проследяване.</li>
            </Styles.InfoList>
          </Styles.InfoBox>
          <Styles.ButtonContainer>
            <Styles.Button as={Link} to="/my-devices">
              Моите устройства
            </Styles.Button>
            <Styles.Button as={Link} to="/">
              Начална страница
            </Styles.Button>
          </Styles.ButtonContainer>
        </Styles.ContentContainer>
      </Styles.PageContainer>
      <Footer />
    </>
  );
};

export default OrderConfirmation;