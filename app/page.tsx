'use client'
import Demo from '@/components/demo';
// import Demo from '@/components/demo';
import Intro from '@/components/Intro';
// import ModulesOptions from '@/components/modulesOptions';
// import WhyChoose from '@/components/whyChoose';
import React, { useState } from 'react';
import styled from 'styled-components';

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
  return (
    <>
   
        <Title>
          <span>CortanaSoft</span> ERP Системи
        </Title>
        <Demo/>
    </>
  );
};

export default Home;