'use client'
import React from 'react';

export default function TermsOfUse() {
  return (
    <main className="bg-white min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Intro Section */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#0092b5] text-center">
          Условия за Ползване
        </h1>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Добре дошли в Cortana Soft! Тези условия за ползване уреждат използването на нашия уебсайт cortanasoft.com и нашите CRM и ERP услуги. Моля, прочетете внимателно.
        </p>

        {/* Introduction Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Въведение</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Тези Условия за ползване („Условия“) представляват правно обвързващо споразумение между вас („Потребител“) и Cortana Soft относно използването на нашия уебсайт и услуги, включително нашите CRM и ERP системи с AI поддръжка от Cortana. С достъпа или използването на нашите услуги, вие се съгласявате да спазвате тези Условия.
        </p>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Ако не сте съгласни с тези Условия, моля, не използвайте нашия уебсайт или услуги.
        </p>

        {/* Use of Services Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Използване на Услугите</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Cortana Soft предоставя CRM и ERP решения, включително складов софтуер, управление на задачи, коментари, вътрешен чат и 24/7 AI поддръжка. За да използвате нашите услуги, вие се съгласявате да:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Предоставите точна и актуална информация при регистрация или подаване на заявки за демо.</li>
          <li>Използвате услугите само за законни цели и в съответствие с приложимите закони в България и ЕС.</li>
          <li>Не се опитвате да получите неоторизиран достъп до нашите системи или да нарушите тяхната сигурност.</li>
          <li>Не копирате, модифицирате или разпространявате нашите услуги без писмено разрешение.</li>
        </ul>

        {/* Account Responsibilities Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Отговорности за Акаунта</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          За да използвате нашите услуги, може да се наложи да създадете акаунт. Вие носите отговорност за:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Запазване на поверителността на вашите данни за вход (потребителско име и парола).</li>
          <li>Всички дейности, извършени от вашия акаунт.</li>
          <li>Незабавно уведомяване на Cortana Soft при подозрение за неоторизиран достъп до вашия акаунт.</li>
        </ul>

        {/* Fees and Payment Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Такси и Плащания</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Нашите услуги се предлагат срещу абонамент, като стартовият пакет започва от 200 лв./месец. Вие се съгласявате да:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Плащате всички дължими такси своевременно.</li>
          <li>Предоставите валидна информация за плащане.</li>
          <li>Уведомите ни за всякакви промени в информацията за плащане.</li>
        </ul>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Неплащането може да доведе до спиране или прекратяване на достъпа до услугите.
        </p>

        {/* Intellectual Property Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Интелектуална Собственост</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Всички права върху софтуера, уебсайта и съдържанието на Cortana Soft принадлежат на нас или нашите лицензодатели. Вие получавате ограничен, непрехвърляем лиценз за използване на услугите, но не можете да:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Копирате, модифицирате или разпространявате нашите услуги или софтуер.</li>
          <li>Декомпилирате или извличате изходния код на нашите системи.</li>
          <li>Използвате нашите търговски марки без писмено разрешение.</li>
        </ul>

        {/* Termination Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Прекратяване</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Можем да прекратим или спрем вашия достъп до услугите, ако:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Нарушите тези Условия.</li>
          <li>Не платите дължимите такси.</li>
          <li>Използвате услугите за незаконни или неетични цели.</li>
        </ul>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Вие можете да прекратите използването на услугите по всяко време, като ни уведомите на{' '}
          <a href="mailto:support@cortanasoft.com" className="text-[#0092b5] hover:underline">
            support@cortanasoft.com
          </a>.
        </p>

        {/* Limitation of Liability Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Ограничаване на Отговорността</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Cortana Soft предоставя услугите „както са“. Ние не носим отговорност за:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>Косвени, случайни или последващи щети, причинени от използването на услугите.</li>
          <li>Загуба на данни или печалби.</li>
          <li>Прекъсвания на услугите поради технически проблеми извън нашия контрол.</li>
        </ul>

        {/* Governing Law Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Приложимо Право</h2>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Тези Условия се уреждат от законите на Република България. Всички спорове ще се разглеждат от компетентните съдилища в София.
        </p>

        {/* Changes Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Промени в Условията</h2>
        <p className="text-lg mb-12 text-gray-900 leading-relaxed">
          Можем да актуализираме тези Условия по всяко време. Ще ви уведомим за значителни промени чрез имейл или на уебсайта ни. Продължавайки да използвате услугите след промените, вие приемате новите Условия.
        </p>

        {/* Contact Section */}
        <h2 className="text-3xl font-bold mb-6 text-[#0092b5]">Контакти</h2>
        <p className="text-lg mb-6 text-gray-900 leading-relaxed">
          Ако имате въпроси относно тези Условия, свържете се с нас на:
        </p>
        <ul className="list-disc space-y-4 text-lg text-gray-900 ml-8 mb-12 leading-relaxed">
          <li>
            Имейл:{' '}
            <a href="mailto:support@cortanasoft.com" className="text-[#0092b5] hover:underline">
              support@cortanasoft.com
            </a>
          </li>
          <li>Телефон: <a href="tel:+359123456789" className="text-[#0092b5] hover:underline">+359 123 456 789</a></li>
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