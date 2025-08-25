// Register.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { useRegisterMutate } from '../hooks';
import { useNavigate, Link } from 'react-router-dom';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const RegisterContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(110, 142, 251, 0.1);
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: #2d3748;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1.5px solid #e3e8ef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 16px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  font-weight: 500;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(110, 142, 251, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    &:active {
      transform: scale(0.98);
    }
  }
`;

const LoginLink = styled(Link)`
  text-align: center;
  color: #6e8efb;
  text-decoration: none;
  margin-top: 24px;
  font-size: 0.95rem;
  display: block;
  font-weight: 500;
  
  &:hover {
    color: #a777e3;
  }
`;

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  
  const useHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      throw new Error('passwords must match')
    }
    useRegisterMutate({
      firstName,
      middleName,
      lastName,
      phone,
      country,
      city,
      address,
      email,
      password
    });
    navigate('/registration-confirmation')
  };

  return (
    <>
      <Header />
      <PageContainer>
        <RegisterContainer>
          <Title>Регистрация в <span>Sentinel</span></Title>
          <Form onSubmit={useHandleSubmit}>
            <InputGroup>
              <Label htmlFor="firstName">Име</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Въведете име"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="middleName">Презиме</Label>
              <Input
                id="middleName"
                type="text"
                placeholder="Въведете презиме"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Въведете фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Имейл адрес</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="phone">Телефонен номер</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+359 888 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="country">Държава</Label>
              <Input
                id="country"
                type="text"
                placeholder="Въведете държава"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="city">Град</Label>
              <Input
                id="city"
                type="text"
                placeholder="Въведете град"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                type="text"
                placeholder="Въведете адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password">Парола</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="confirmPassword">Потвърди парола</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputGroup>
            <Button type="submit">Регистрирай се</Button>
          </Form>
          <LoginLink to="/login">Вече имате акаунт? Влезте тук</LoginLink>
        </RegisterContainer>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Register;