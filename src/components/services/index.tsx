import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';

const ServicesContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (min-width: 1400px) {
    max-width: 1400px;
    padding: 80px 40px;
  }
  
  @media (max-width: 1200px) {
    padding: 50px 24px;
  }
  
  @media (max-width: 768px) {
    padding: 32px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 12px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 20px;
  padding: 0;
  color: #2d3748;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 12px;
    padding: 0 10px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 60px;
  
  @media (min-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
    margin-bottom: 80px;
  }
  
  @media (max-width: 1200px) {
    gap: 32px;
    margin-bottom: 50px;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto 40px;
    gap: 28px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
    margin-bottom: 32px;
  }
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(110, 142, 251, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1400px) {
    padding: 48px;
  }
  
  @media (max-width: 1200px) {
    padding: 32px;
  }
  
  @media (max-width: 900px) {
    padding: 28px;
  }
  
  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 16px;
  }
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(110, 142, 251, 0.15);
    }
  }
  
  /* Улучшенная поддръжка на тъч устройства */
  @media (hover: none) {
    &:active {
      transform: scale(0.98);
    }
  }
`;

const ServiceTitle = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #6e8efb;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ServiceDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    color: #4a5568;
    margin-bottom: 12px;
    padding-left: 24px;
    position: relative;
    
    &:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #6e8efb;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 768px) {
    li {
      font-size: 0.95rem;
      margin-bottom: 8px;
    }
  }
`;

const SupportSection = styled.div`
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  border-radius: 24px;
  padding: 60px 40px;
  margin: 60px -20px 0;
  box-sizing: border-box;
  width: calc(100% + 40px);
  
  @media (min-width: 1400px) {
    padding: 80px 60px;
    margin: 80px -40px 0;
    width: calc(100% + 80px);
    border-radius: 30px;
  }
  
  @media (max-width: 1200px) {
    padding: 48px 32px;
    margin: 50px -24px 0;
    width: calc(100% + 48px);
  }
  
  @media (max-width: 900px) {
    padding: 40px 24px;
    margin: 40px -16px 0;
    width: calc(100% + 32px);
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 16px;
    margin: 32px -12px 0;
    width: calc(100% + 24px);
    border-radius: 16px;
  }
`;

const SupportTitle = styled.h2`
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 24px;
  text-align: center;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const SupportContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 1400px) {
    gap: 40px;
  }
  
  @media (max-width: 1200px) {
    gap: 24px;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    gap: 20px;
  }
`;

const SupportCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SupportIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6e8efb20, #a777e320);
  border-radius: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #6e8efb;
  }
`;

const SupportCardTitle = styled.h3`
  color: #2d3748;
  font-size: 1.2rem;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SupportCardDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Services: React.FC = () => {
  return (
    <>
      <Header />
      <ServicesContainer>
        <Title>
          Нашите <span>Услуги</span>
        </Title>
        <Subtitle>
          Предлагаме цялостно решение за сигурност, включващо хардуер, софтуер и
          професионална поддръжка за вашето спокойствие
        </Subtitle>

        <ServicesGrid>
          <ServiceCard>
            <ServiceTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Цялостна Cloud Платформа
            </ServiceTitle>
            <ServiceDescription>
              Нашата cloud платформа обработва и анализира данните от вашите устройства
              в реално време, осигурявайки надеждна защита 24/7.
            </ServiceDescription>
            <ServiceFeatures>
              <li>Обработка на данни в реално време</li>
              <li>Защитено съхранение на информацията</li>
              <li>Автоматични ъпдейти на системата</li>
              <li>Високa надеждност и достъпност</li>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
              </svg>
              Мобилно Приложение
            </ServiceTitle>
            <ServiceDescription>
              Мобилното ни приложение ви държи информирани за състоянието на вашите
              устройства, където и да се намирате.
            </ServiceDescription>
            <ServiceFeatures>
              <li>Мигновени push известия</li>
              <li>Интуитивен потребителски интерфейс</li>
              <li>Поддръжка за Android и iOS</li>
              <li>Без нужда от инсталация (PWA)</li>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              Уеб Платформа
            </ServiceTitle>
            <ServiceDescription>
              Модерна уеб платформа за управление на вашите устройства с разширени
              възможности за наблюдение и контрол.
            </ServiceDescription>
            <ServiceFeatures>
              <li>Достъп от всяко устройство</li>
              <li>Детайлна статистика и анализи</li>
              <li>Управление на множество устройства</li>
              <li>Персонализируеми настройки</li>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12" y2="17"/>
              </svg>
              Техническа Поддръжка
            </ServiceTitle>
            <ServiceDescription>
              Предлагаме професионална техническа поддръжка и сервиз за безпроблемната
              работа на вашите устройства.
            </ServiceDescription>
            <ServiceFeatures>
              <li>Денонощна телефонна поддръжка</li>
              <li>Посещение на място в София</li>
              <li>Онлайн консултации</li>
              <li>Бързо отстраняване на проблеми</li>
            </ServiceFeatures>
          </ServiceCard>
        </ServicesGrid>

        <SupportSection>
          <SupportTitle>
            Нашите <span>Гаранции</span>
          </SupportTitle>
          <SupportContent>
            <SupportCard>
              <SupportIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
                </svg>
              </SupportIcon>
              <SupportCardTitle>2 Години Гаранция</SupportCardTitle>
              <SupportCardDescription>
                Пълна гаранция на всички устройства за период от 2 години с
                възможност за безплатна подмяна при фабрични дефекти.
              </SupportCardDescription>
            </SupportCard>

            <SupportCard>
              <SupportIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </SupportIcon>
              <SupportCardTitle>Професионален Сервиз</SupportCardTitle>
              <SupportCardDescription>
                Оторизиран сервиз с професионални техници и бързо време за реакция
                при възникнали проблеми.
              </SupportCardDescription>
            </SupportCard>

            <SupportCard>
              <SupportIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </SupportIcon>
              <SupportCardTitle>Техническа Помощ</SupportCardTitle>
              <SupportCardDescription>
                Винаги на разположение за съдействие при настройка и използване на устройствата с 
                бърза реакция при проблеми.
              </SupportCardDescription>
            </SupportCard>
          </SupportContent>
        </SupportSection>
      </ServicesContainer>
      <Footer />
    </>
  );
};

export default Services;