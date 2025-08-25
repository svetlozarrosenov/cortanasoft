import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';

const PageContainer = styled.div`
 min-height: 100vh;
 display: flex;
 flex-direction: column;
`;

const ContentSection = styled.section`
 width: 100%;
 max-width: 1200px;
 margin: 0 auto;
 padding: 60px 20px;
 
 @media (max-width: 768px) {
   padding: 30px 15px;
   max-width: 300px;
 }
`;

const Title = styled.h1`
 background: linear-gradient(135deg, #6e8efb, #a777e3);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 font-size: 3rem;
 text-align: center;
 margin-bottom: 50px;
 font-weight: 600;

 @media (max-width: 768px) {
   font-size: 2rem;
   margin-bottom: 30px;
 }
`;

const SubTitle = styled.h2`
 color: #6e8efb;
 font-size: 1.8rem;
 margin: 40px 0 20px;
 font-weight: 500;

 @media (max-width: 768px) {
   font-size: 1.4rem;
   margin: 30px 0 15px;
 }
`;

const FeatureTitle = styled.h3`
 background: linear-gradient(135deg, #6e8efb, #a777e3);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 font-size: 1.4rem;
 margin: 30px 0 15px;
 font-weight: 500;

 @media (max-width: 768px) {
   font-size: 1.2rem;
   margin: 25px 0 12px;
 }
`;

const TextContainer = styled.div`
 display: grid;
 grid-gap: 20px;
 max-width: 800px;
 margin: 0 auto;

 @media (max-width: 768px) {
   grid-gap: 15px;
 }
`;

const Paragraph = styled.p`
 color: #4a5568;
 font-size: 1.125rem;
 line-height: 1.8;
 letter-spacing: 0.3px;
 
 @media (max-width: 768px) {
   font-size: 1rem;
   line-height: 1.6;
   letter-spacing: 0.2px;
   text-align: left;
 }
`;

const HighlightText = styled.span`
 background: linear-gradient(135deg, #6e8efb, #a777e3);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 font-weight: 600;

 @media (max-width: 768px) {
   display: inline-block;
   margin: 5px 0;
 }
`;

const CallToAction = styled.div`
 margin-top: 40px;
 padding-top: 30px;
 border-top: 2px solid rgba(110, 142, 251, 0.1);
 text-align: center;

 @media (max-width: 768px) {
   margin-top: 30px;
   padding-top: 25px;
 }
`;

const CTAText = styled.p`
 font-size: 1.3rem;
 line-height: 1.8;
 color: #4a5568;
 margin-bottom: 25px;
 
 @media (max-width: 768px) {
   font-size: 1.1rem;
   line-height: 1.6;
   margin-bottom: 20px;
   text-align: center;
   padding: 0 10px;
 }

 &:last-child {
   margin-bottom: 0;
 }
`;

const About: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <ContentSection>
        <Title>За Sentinel</Title>
        <TextContainer>
        <Paragraph>
            Sentinel въвежда иновативен подход в сферата на сигурността, предлагайки 
            интелигентна алармена система от ново поколение. <HighlightText>
            Нашето решение елиминира нуждата от SIM карти в сензорите, което означава 
            никакви месечни такси за нашите потребители.</HighlightText>
          </Paragraph>

          <SubTitle>Иновативна защита за вашата собственост</SubTitle>
          <Paragraph>
            При засичане на нарушител, системата моментално изпраща сигнал до вашия телефон, 
            позволявайки незабавна реакция. Това означава, че крадецът може да бъде заловен 
            на място - преди да е успял да се отдалечи с вашата собственост.
          </Paragraph>

          <FeatureTitle>Удобство на батерията</FeatureTitle>
          <Paragraph>
            Нашите устройства са оборудвани с ефективни батерии, осигуряващи до 6 дни работа 
            с едно зареждане. Това означава много по-малко грижи около поддръжката - не е нужно 
            да мислите постоянно за презареждане, а можете просто да се наслаждавате на 
            спокойствието, което системата ви предоставя.
          </Paragraph>

          <FeatureTitle>Универсално приложение</FeatureTitle>
          <Paragraph>
            Независимо дали става въпрос за автомобил, мотоциклет или скъп велосипед, 
            Sentinel предлага надеждна защита. Собствениците на автомобили вече могат да 
            паркират спокойно пред блока, знаейки че колата им е под постоянно наблюдение.
          </Paragraph>
          <Paragraph>
            За велосипедистите и мотористите, системата предлага безпрецедентно ниво на 
            сигурност - вече можете да оставите своя велосипед или мотор, без да се 
            притеснявате за тяхната безопасност.
          </Paragraph>

          <SubTitle>Част от нещо по-голямо</SubTitle>
          <Paragraph>
            Sentinel се отличава с уникален подход към разрастването на мрежата си. 
            Всеки нов клиент автоматично става част от нашата разширяваща се мрежа, 
            като устройствата му допринасят за общото покритие. Това създава непрекъснато 
            растяща безплатна интернет инфраструктура, от която всички потребители се 
            възползват.
          </Paragraph>
          <Paragraph>
            Чрез своето мобилно приложение, Sentinel осигурява незабавни известия директно 
            на вашия телефон, давайки ви пълен контрол и спокойствие за защитата на 
            вашата собственост, без допълнителни разходи и усложнения.
          </Paragraph>

          <CallToAction>
            <CTAText>
              Sentinel е повече от алармена система - това е вашият надежден партньор в 
              сигурността. Без месечни такси, без сложни инсталации, без компромиси с 
              качеството. Изберете спокойствието, изберете иновацията, изберете Sentinel.
            </CTAText>
            <CTAText>
              <HighlightText>
                Присъединете се към мрежата на бъдещето и защитете това, което е важно за вас.
              </HighlightText>
            </CTAText>
          </CallToAction>
        </TextContainer>
      </ContentSection>
      <Footer />
    </PageContainer>
  );
};

export default About;