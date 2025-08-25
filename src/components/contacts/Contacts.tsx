import React, { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import Intro from '../intro';
import { addContactMessageMutate } from './hooks';

// Стилове
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentSection = styled.section`
  padding: 32px 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 24px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const ContactInfo = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(110, 142, 251, 0.1);
  flex: 1;
  min-width: 280px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    min-width: unset; /* За по-малки екрани */
  }
`;

const ContactTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }
`;

const ContactDetail = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ContactForm = styled.form`
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(110, 142, 251, 0.1);
  flex: 1;
  min-width: 280px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    gap: 16px;
    min-width: unset;
  }
`;

const Input = styled.input`
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(110, 142, 251, 0.3);
  font-size: 1rem;
  color: #4a5568;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(110, 142, 251, 0.3);
  font-size: 1rem;
  color: #4a5568;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 16px 48px;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;

  &:hover {
    background: linear-gradient(135deg, #5d7de8, #9566d0);
  }

  @media (max-width: 768px) {
    padding: 12px 32px;
    font-size: 1rem;
    border-radius: 8px;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.05), rgba(167, 119, 227, 0.05));
  border: 1px solid rgba(110, 142, 251, 0.2);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  color: #2d3748;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    font-size: 0.95rem;
    max-width: 100%;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-top: 16px;
  }
`;

const Contacts: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await addContactMessageMutate({ name, email, phone, subject, message });
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setError('Грешка при изпращане на съобщението. Моля, опитайте отново.');
      console.error('Error:', error);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <Intro />
      <PageContainer>
        <ContentSection>
          <Title>Контакти</Title>
          <ContentContainer>
            <ContactInfo>
              <ContactTitle>Свържете се с нас</ContactTitle>
              <ContactDetail>Телефон: +359 87 664 9967</ContactDetail>
              <ContactDetail>Email: sentinel@sentinel-bg.info</ContactDetail>
            </ContactInfo>

            <ContactInfo>
              <ContactTitle>Работно време</ContactTitle>
              <ContactDetail>Понеделник - Петък: 9:00 - 18:00</ContactDetail>
              <ContactDetail>Събота: 10:00 - 14:00</ContactDetail>
              <ContactDetail>Неделя: Почивен ден</ContactDetail>
            </ContactInfo>

            {!isSubmitted ? (
              <ContactForm onSubmit={handleSubmit}>
                <ContactTitle>Изпратете ни съобщение</ContactTitle>
                <Input
                  type="text"
                  placeholder="Вашето име"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Вашият имейл"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Телефон"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Тема"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  placeholder="Вашето съобщение"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                >
                  Изпрати
                </Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </ContactForm>
            ) : (
              <SuccessMessage>
                Вашето съобщение беше изпратено успешно! Благодарим ви, че се свързахте с нас. Ще ви отговорим възможно най-скоро на посочения имейл или телефон.
              </SuccessMessage>
            )}
          </ContentContainer>
        </ContentSection>
      </PageContainer>
      <Footer />
    </PageWrapper>
  );
};

export default Contacts;