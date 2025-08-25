import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import Intro from '../Intro';
import { subscribeMutate } from './hooks';
import WhyChoose from '../whyChoose';
import DemoRequest from '../demo';
import ModulesOptions from '../modulesOptions';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #2d3748;
  padding: 0 16px;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    line-height: 1.3;
    margin: 16px 0;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #4a5568;
  padding: 0 16px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 24px;
    padding: 0 16px;
  }
`;

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutate(email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <Header />
      <Intro />
      <HomeContainer>
        <Title>
          <span>ZodSoft</span> ERP Системи
        </Title>
        <Subtitle>Иновативна защита за вашите велосипеди, мотори и коли!</Subtitle>
        
        <WhyChoose />
        <DemoRequest/>
        <ModulesOptions />
    
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;