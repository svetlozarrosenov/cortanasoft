import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';

const TermsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TermsTitle = styled.h1`
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

const TermsSection = styled.section`
  margin: 40px 0;
  
  @media (max-width: 768px) {
    margin: 24px 0;
  }
`;

const TermsBlock = styled.div`
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  border-radius: 20px;
  padding: 48px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 24px;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
`;

const TermsText = styled.div`
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;

  p {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 16px;
    padding-left: 28px;
    position: relative;

    &:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #6e8efb;
      font-weight: bold;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    
    p {
      margin-bottom: 16px;
    }

    li {
      margin-bottom: 12px;
      padding-left: 24px;
    }
  }
`;

const Terms: React.FC = () => {
  return (
    <>
      <Header />
      <TermsContainer>
        <TermsTitle>
          Общи <span>условия</span>
        </TermsTitle>
        
        <TermsSection>
          <TermsBlock>
            <SectionTitle>1. Обща информация</SectionTitle>
            <TermsText>
              <p>
              Добре дошли в sentinelbg.com, уебсайт собственост на <strong> Електрик Експрес ЕООД </strong>, със седалище гр. София, ул. Леа Иванова 2.

              
             <p>Настоящия текст има за цел да поясни общите условия за ползване на sentinelbg.com, 
              включително свободния достъп до информация, както и предлаганите продукти и услуги. Използвайки sentinelbg.com Вие автоматично давате съгласието си с настоящите условия.
              <strong> Електрик Експрес ЕООД </strong> запазва правото си да извършва промени или обновяване в настоящите условия, влизайки в сила, веднага след тяхното публикуване. Моля, прочетете 
              внимателно настоящите общи условия преди да закупите или използвате нашите продукти.</p> 

                 <strong> Алармени системи Sentinel </strong>
                предлагат иновативна алармена система за защита на велосипеди, мотори и автомобили, 
                която не изисква SIM карта за връзка с интернет. Вместо това системата използва мрежа от 
                приемници, за да изпраща известия директно до вашия телефон в реално време.
              </p>
              
                
              
            </TermsText>
          </TermsBlock>

          <TermsBlock>
            <SectionTitle>2. Описание на <span>услугата</span></SectionTitle>
            <TermsText>
              <p>
                Sentinel е алармена система, предназначена да защитава вашето имущество чрез:
              </p>
              <ul>
                <li>Известяване в реално време чрез Progressive Web App (PWA), инсталирано на вашия телефон</li>
                <li>Работа без SIM карта, което елиминира нуждата от месечни абонаменти</li>
                <li>Обхват, зависещ от мрежата от приемници – между 1 и 5 км в зависимост от района</li>
                <li>Енергийно ефективен дизайн с до 6 дни работа на едно зареждане</li>
                <li>Лесна инсталация и настройка чрез домашна WiFi мрежа</li>
              </ul>
              <p>
                Услугата включва доставка на сензор и приемник, които работят в комбинация, за да осигурят 
                надеждна защита на вашето превозно средство.
              </p>
            </TermsText>
          </TermsBlock>

          <TermsBlock>
            <SectionTitle>3. Условия за <span>ползване</span></SectionTitle>
            <TermsText>
              <p>
                За да използвате услугата на Sentinel, е необходимо:
              </p>
              <ul>
                <li>Да направите регистрация на нашия уебсайт и да поръчате устройство</li>
                <li>Да инсталирате нашия PWA на телефона си за получаване на известия</li>
                <li>Да настроите приемника към стабилна WiFi мрежа с интернет достъп</li>
              </ul>
              <p>
                Устройствата са предназначени за лична употреба и не трябва да се използват за незаконни цели. 
                Всеки опит за модификация на софтуера или хардуера може да доведе до прекратяване на гаранцията.
              </p>
            </TermsText>
          </TermsBlock>

          <TermsBlock>
            <SectionTitle>4. Декларация за <span> поверителност</span></SectionTitle>
            <TermsText>
              <p>
              Всеки един потребител може да направи поръчка, като през електронната ни система, така и по телефона. Основните данни, съхранени за Вас са от електронната ни система при:
              </p>
              <ul>
                <li> регистрация</li>
                <li> извършване на поръчка </li>
                <li> отговаряйки на анкети </li>
                <li> използването на друга функционалност от сайта </li>
                <li>
                    Извършвайки поръчка или регистрация, исканата информация от Вас може да бъде: име, точен адрес, електронна поща, телефонен номер, начина за плащане, предпочитан куриер и други. 
                    Отказвайки да посочите личните си данни, води до невъзможност за обработване на Вашата заявката и завършване на поръчката.
                    Електрик Експрес ЕООД не продава, предоставя или търгува по един или друг начин Вашата лична информация на трети лица. 
                    Стремежът ни е да осигурим максимална сигурност за всичките си потребители, оправдавайки доверието им. Основната цел, за събирането на данни е изпълнението на поръчки, чрез изготвяне на документация, като - фактури, гаранционни карти и извършване на доставки. 
                    Когато се регистрирате, купувате продукти или услуги, събраната информация може да ни послужи по следните начини:
                </li>
                <li> За да подобрим нашите услуги</li>
                <li> За бързо и качествено обработване на поръчки</li>
                <li> За изпращане на електронни имейли, ако изрично сте дали съгласието си. </li>
              </ul>
              <p>
                Обхватът на системата зависи от мрежата от приемници и може да варира в различни райони.
              </p>
            </TermsText>
          </TermsBlock>

          <TermsBlock>
            <SectionTitle>4. Права и <span>задължения</span></SectionTitle>
            <TermsText>
              <p>
                <strong>Вашите права:</strong>
              </p>
              <ul>
                <li>Получаване на известия при опит за кражбa</li>
                <li>2 години гаранция на устройствата</li>
              </ul>
              <p>
                <strong>Вашите задължения:</strong>
              </p>
              <ul>
                <li>Да осигурите интернет връзка за приемника</li>
                <li>Да поддържате устройствата в добро състояние</li>
                <li>Да уведомите екипа ни при проблем с продукта</li>
              </ul>
            </TermsText>
          </TermsBlock>

          <TermsBlock>
            <SectionTitle>5. Липса на <span>отговорността</span></SectionTitle>
            <TermsText>
              <p>
                Sentinel Алармени Системи не носи отговорност за:
              </p>
              <ul>
                <li>Прекъсвания в известията, причинени от липса на интернет връзка</li>
                <li>Щети, причинени от неправилна употреба на устройствата</li>
                <li>Кражи, ако системата не е активирана или правилно настроена</li>
              </ul>
              <p>
                Обхватът на системата зависи от мрежата от приемници и може да варира в различни райони.
              </p>
            </TermsText>
          </TermsBlock>

          <TermsBlock>
            <SectionTitle>6. Контакти</SectionTitle>
            <TermsText>
              <p>
                Ако имате въпроси относно тези общи условия или услугата, можете да се свържете с нас на:
              </p>
              <ul>
                <li>Имейл: support@sentinelbg.com</li>
                <li>Телефон: +359 123 456 789</li>
              </ul>
            </TermsText>
          </TermsBlock>
        </TermsSection>
      </TermsContainer>
      <Footer />
    </>
  );
};

export default Terms;