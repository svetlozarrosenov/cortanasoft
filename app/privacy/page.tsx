'use client'
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Intro Section */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#0092b5] text-center">
          Политика за Поверителност
        </h1>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          В Cortana Soft ние се ангажираме да защитаваме вашата поверителност. Тази политика обяснява как събираме, използваме и защитаваме вашите лични данни.
        </p>

        {/* Introduction Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Въведение</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Тази Политика за поверителност описва как Cortana Soft събира, използва, разкрива и защитава вашите лични данни при използване на нашия уебсайт cortanasoft.com и нашите услуги, включително CRM и ERP системи с AI поддръжка от Cortana.
        </p>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Ние спазваме Общия регламент за защита на данните (GDPR) и други приложими закони за защита на данните в България и ЕС.
        </p>

        {/* Data Collection Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Събиране на Данни</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Ние събираме следните видове данни:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Лични данни: Име, имейл адрес, телефонен номер, когато попълвате форми за демо или контакт.</li>
          <li>Данни за използване: IP адрес, браузър тип, посещавани страници, за да подобрим услугите ни.</li>
          <li>Бизнес данни: Информация, която качвате в нашата CRM/ERP система, като клиентски данни, фактури и т.н.</li>
          <li>Cookies: Използваме cookies за функционалност и аналитика. Можете да управлявате предпочитанията си в браузъра.</li>
        </ul>

        {/* Data Usage Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Използване на Данни</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Вашите данни се използват за:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Предоставяне на услуги: Обработка на заявки за демо, поддръжка и управление на акаунти.</li>
          <li>Подобряване на продукта: Анализ на използването за оптимизация на CRM/ERP системата и AI поддръжката.</li>
          <li>Маркетинг: Изпращане на актуализации и оферти, само с ваше съгласие.</li>
          <li>Съответствие: Спазване на законови изисквания.</li>
        </ul>

        {/* Data Sharing Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Споделяне на Данни</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Ние не продаваме вашите данни. Споделяме ги само с:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Доставчици на услуги: За хостинг, плащания и AI обработка, под строги договори за поверителност.</li>
          <li>Законови органи: Ако се изисква по закон.</li>
          <li>В случай на сливане или продажба на компанията.</li>
        </ul>

        {/* Security Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Сигурност на Данните</h2>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Използваме мерки като криптиране, фаеруоли и редовни одити за защита на вашите данни. Въпреки това, никоя система не е 100% сигурна.
        </p>

        {/* User Rights Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Вашите Права</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Според GDPR, имате право на:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Достъп до вашите данни.</li>
          <li>Поправка на неточни данни.</li>
          <li>Изтриване на данни („правото да бъдете забравени“).</li>
          <li>Ограничаване на обработката.</li>
          <li>Преносимост на данни.</li>
          <li>Възразяване срещу обработката.</li>
        </ul>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          За да упражните тези права, свържете се с нас на{' '}
          <a href="mailto:support@cortanasoft.com" className="text-[#0092b5] hover:underline">
            support@cortanasoft.com
          </a>.
        </p>

        {/* Changes Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Промени в Политиката</h2>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Можем да актуализираме тази политика. Ще ви уведомим за значителни промени чрез имейл или на сайта ни. Последна актуализация: 11 септември 2025.
        </p>

        {/* Contact Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Контакти</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Ако имате въпроси относно тази политика, свържете се с нас на:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>
            Имейл:{' '}
            <a href="mailto:support@cortanasoft.com" className="text-[#0092b5] hover:underline">
              support@cortanasoft.com
            </a>
          </li>
          <li>
            Телефон:{' '}
            <a href="tel:+359123456789" className="text-[#0092b5] hover:underline">
              +359 123 456 789
            </a>
          </li>
          <li>Адрес: ул. Бизнес Център 10, София, България</li>
        </ul>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-[#0092b5] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#007a99] transition"
          >
            Върни се на началната страница
          </a>
        </div>
      </div>
    </main>
  );
}