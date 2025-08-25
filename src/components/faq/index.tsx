import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { ChevronDown } from 'lucide-react';

const FAQContainer = styled.div`
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
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 32px;
    padding: 0 12px;
  }
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 16px;
  border: 1px solid rgba(110, 142, 251, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    border-radius: 8px;
  }
`;

const QuestionButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 24px;
  background: ${props => props.isOpen ? 'linear-gradient(135deg, #6e8efb08, #a777e308)' : 'white'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: left;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
    transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
    flex-shrink: 0;
    margin-left: 16px;
  }
  
  &:hover {
    background: linear-gradient(135deg, #6e8efb08, #a777e308);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    font-size: 0.95rem;
  }
`;

const Answer = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '0 24px 24px' : '0 24px'};
  color: #4a5568;
  line-height: 1.6;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: ${props => props.isOpen ? '0 20px 20px' : '0 20px'};
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.isOpen ? '0 16px 16px' : '0 16px'};
  }
`;

const FAQ: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const questions = [
    {
      question: "Как работи алармената система без SIM карта?",
      answer: "Нашата система използва мрежа от приемници, стратегически разположени в града. Когато алармата се активира, сигналът се предава през тези приемници до нашите сървъри, откъдето получавате известие на телефона си. Не е необходима SIM карта, което означава никакви месечни такси за мобилни услуги."
    },
    {
      question: "Какъв е обхватът на системата?",
      answer: "Обхватът зависи от гъстотата на приемниците в района. В градска среда обикновено е между 1 и 5 километра. С всеки нов клиент мрежата се разширява, увеличавайки покритието. При закупуване на устройство, получавате и приемник, който разширява мрежата в района ви."
    },
    {
      question: "Как да инсталирам мобилното приложение?",
      answer: "Нашето приложение е Progressive Web App (PWA). За да го инсталирате: 1) Отворете нашия сайт в браузъра на телефона си, 2) Ще видите опция 'Добави към начален екран', 3) Натиснете я и приложението ще се инсталира автоматично. Поддържа се на Android 5.0+ и iOS 16.4+."
    },
    {
      question: "Колко време издържа батерията?",
      answer: "Благодарение на нашата енергийно ефективна технология, сензорът работи до 6 дни с едно зареждане. Зареждането става лесно с Type-C кабел (5V) и отнема около 2 часа за пълно зареждане."
    },
    {
      question: "Как се настройва приемникът?",
      answer: "Настройката е много проста: 1) Включете приемника в контакта, 2) Свържете се към WiFi мрежата 'sentinel_config', 3) Отворете който и да е сайт - ще бъдете пренасочени към конфигурационния панел, 4) Изберете вашата домашна WiFi мрежа и въведете паролата. Готово!"
    },
    {
      question: "Какви гаранции получавам?",
      answer: "Предлагаме 2-годишна гаранция на всички устройства, която включва безплатна подмяна при фабрични дефекти. Освен това имате достъп до денонощна техническа поддръжка по телефона и безплатно посещение на адрес при проблеми (в София)."
    },
    {
      question: "Мога ли да използвам системата извън града?",
      answer: "Да, системата работи и извън града, но обхватът може да варира в зависимост от терена и наличието на приемници в района. За оптимална работа препоръчваме да инсталирате приемника на видимо място с добра WiFi връзка."
    },
    {
      question: "Какво се случва при прекъсване на интернет връзката?",
      answer: "Приемникът ще запамети всички събития, които са се случили докато е бил офлайн, и ще ги изпрати веднага щом връзката се възстанови. Сензорът продължава да работи нормално, независимо от интернет връзката."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
      <Header />
      <FAQContainer>
        <Title>
          Често задавани <span>въпроси</span>
        </Title>
        <Subtitle>
          Тук ще намерите отговори на най-често задаваните въпроси за нашата система.
          Ако не откриете отговора, който търсите, не се колебайте да се свържете с нас.
        </Subtitle>
        
        <FAQSection>
          {questions.map((item, index) => (
            <FAQItem key={index}>
              <QuestionButton
                isOpen={openQuestion === index}
                onClick={() => toggleQuestion(index)}
              >
                {item.question}
                <ChevronDown size={20} color="#6e8efb" />
              </QuestionButton>
              <Answer isOpen={openQuestion === index}>
                {item.answer}
              </Answer>
            </FAQItem>
          ))}
        </FAQSection>
      </FAQContainer>
      <Footer />
    </>
  );
};

export default FAQ;