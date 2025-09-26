'use client'
import Demo from '@/components/demo';
import Features from '@/components/features';
import Additional from '@/components/homepage/additional';
import Boxes from '@/components/homepage/boxes';
import FeaturesSecondary from '@/components/homepage/featuresSecondary';
import FeaturesWithReversed from '@/components/homepage/featuresWithReversed';
import Functionalities from '@/components/homepage/functionalities';
import Section from '@/components/homepage/section';
import Intro from '@/components/Intro';
import React, { useState } from 'react';

export default function Home() {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Грешка при изпращане на заявката. Моля, опитайте отново.');
      }
    } catch (error) {
      alert('Грешка при изпращане на заявката. Моля, опитайте отново.');
      console.error(error);
    }
  };

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