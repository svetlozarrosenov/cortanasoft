import Demo from '@/components/demo';
import Features from '@/components/features';
import Additional from '@/components/homepage/additional';
import Boxes from '@/components/homepage/boxes';
import FeaturesSecondary from '@/components/homepage/featuresSecondary';
import FeaturesWithReversed from '@/components/homepage/featuresWithReversed';
import Functionalities from '@/components/homepage/functionalities';
import Section from '@/components/homepage/section';
import Intro from '@/components/Intro';
import React from 'react';

export default function Home() {
  return (
    <>
     <Intro />
    <Features />
    <Boxes />
    <Section />
    <FeaturesWithReversed />
    <Additional />
    <Functionalities />
    <Demo />
    <FeaturesSecondary />
    </>
  );
}