import Info from '@/components/aboutPage/info';
import Story from '@/components/aboutPage/story';
import IntroSecondary from '@/components/common/introSecondary';
import Demo from '@/components/demo';
import Additional from '@/components/homepage/additional';
import React from 'react';

export default function About() {
  const data = {title: 'For Cortana Soft', content: "We are a team of passionate professionals who create innovative CRM and ERP solutions to help businesses in Bulgaria thrive."};

  return (
    <>
    <IntroSecondary data={data} />
    <Story image={'/images/about-1.png'} />
    <Info />
    <Story image={'/images/about-2.png'} reversed />
    <Additional />
    <Demo />
    </>
  );
}