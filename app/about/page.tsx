import Story from '@/components/about/story';
import IntroSecondary from '@/components/common/introSecondary';
import Demo from '@/components/demo';
import Additional from '@/components/homepage/additional';
import React from 'react';

export default function About() {
  return (
    <>
    <IntroSecondary />
    <Story image={'/images/about-1.png'} />
    <Story image={'/images/about-2.png'} reversed />
    <Additional />
    <Demo />
    </>
  );
}