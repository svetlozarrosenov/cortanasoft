'use client'
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
    <main className="bg-white min-h-screen">
      {/* Intro/Hero Section (White) */}
      <section className="bg-white py-20 px-4 text-center flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="md:w-1/2">
          <img
            src="/images/ai-assistant-background.png" // Замени с пътя към твоята картинка на Cortana
            alt="Cortana AI"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#0092b5]">Една Бизнес Система, Безкрайни Възможности!</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-900">Надеждна, бърза и адаптивна към вашия бизнес. Cortana Soft предлага интелигентни CRM и ERP решения, подкрепени от 24/7 AI поддръжка от Cortana.</p>
          <button
            onClick={() => setShowDemoForm(true)}
            className="bg-[#0092b5] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#007a99] transition"
          >
            Заяви Демо
          </button>
        </div>
      </section>

      {/* What is CRM Section (Blue) */}
      <section className="bg-[#0092b5] text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Какво е CRM Система?</h2>
          <p className="text-lg mb-6">CRM (Customer Relationship Management) е софтуер, който помага на бизнеса да управлява взаимодействията с клиентите. Той събира данни за клиенти, проследява продажби, маркетинг и поддръжка, за да подобри отношенията и да увеличи приходите.</p>
          <p className="text-lg mb-6">В Cortana Soft нашата CRM система е проектирана за българския пазар, с функции като автоматизирани имейли, проследяване на лийдове и персонализирани отчети.</p>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Защо Вашият Бизнес Има Нужда от CRM?</h3>
            <ul className="list-disc space-y-2 ml-6">
              <li>Подобрява клиентското обслужване и лоялността.</li>
              <li>Автоматизира процесите за по-голяма ефективност.</li>
              <li>Предоставя аналитика за по-добри решения.</li>
              <li>Помага на екипите да работят заедно по-ефективно.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What is ERP Section (White) */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#0092b5]">Какво е ERP Система?</h2>
          <p className="text-lg mb-6 text-gray-900">ERP (Enterprise Resource Planning) е интегрирана система, която управлява всички аспекти на бизнеса – от финанси и инвентар до HR и производство. Тя обединява данните в реално време за по-добър контрол и оптимизация.</p>
          <p className="text-lg mb-6 text-gray-900">Cortana Soft ERP предлага пълна интеграция, включително складов софтуер за управление на запаси, проследяване на поръчки и автоматизирано фактуриране.</p>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Защо Вашият Бизнес Има Нужда от ERP?</h3>
            <ul className="list-disc space-y-2 ml-6">
              <li>Намалява разходите чрез ефективно управление на ресурси.</li>
              <li>Подобрява точността на данните и намалява грешките.</li>
              <li>Ускорява процесите и подобрява продуктивността.</li>
              <li>Осигурява съответствие с регулации и стандарти.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Warehouse Software Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Складов Софтуер за Ефективно Управление</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Автоматизирано Проследяване</h3>
            <p>Мониторирайте запасите в реално време, за да избегнете дефицити или прекомерни запаси.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Интеграция с Поръчки</h3>
            <p>Свържете склада си с продажби и доставки за безпроблемен поток.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Отчети и Аналитика</h3>
            <p>Генерирайте детайлни отчети за оптимизация на складовите процеси.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Мобилен Достъп</h3>
            <p>Управлявайте склада от всяко устройство, навсякъде.</p>
          </div>
        </div>
      </section>

      {/* Additional Features Section (White) */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0092b5]">Допълнителни Функции на Cortana Soft</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Създаване на Задачи (Тикети)</h3>
            <p>Лесно създавайте и проследявайте задачи за екипа си, с приоритети и крайни срокове.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Коментари и Обсъждания</h3>
            <p>Добавяйте коментари към задачи, клиенти или проекти за по-добра комуникация.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Вътрешен Чат</h3>
            <p>Интегриран чат за реално време комуникация между екипа, директно в системата.</p>
          </div>
        </div>
      </section>

      {/* Pricing and Features Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Какво Получавате за 200 лв./месец?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">CRM Функционалности</h3>
            <ul className="list-disc space-y-2 text-lg ml-6">
              <li>Управление на клиенти и потенциални клиенти</li>
              <li>Автоматизирани имейли</li>
              <li>Създаване и проследяване на задачи</li>
              <li>Вътрешен чат за екипа</li>
              <li>Календар за планиране</li>
              <li>Бележки за организация</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">ERP Функционалности</h3>
            <ul className="list-disc space-y-2 text-lg ml-6">
              <li>Управление на продажби</li>
              <li>Проследяване на доставки</li>
              <li>Управление на финансови потоци</li>
              <li>Управление на различни обекти</li>
              <li>Генериране на счетоводни документи</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 text-gray-900">
            <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Допълнителни Предимства</h3>
            <ul className="list-disc space-y-2 text-lg ml-6">
              <li>Безплатна поддръжка и съдействие по телефон</li>
              <li>Безплатна поддръжка и съдействие по имейл</li>
              <li>Автоматично ъпдейтване на системата</li>
              <li>24/7 поддръжка от Cortana AI</li>
            </ul>
          </div>
          <div className="text-center md:col-span-2">
            <p className="text-xl mb-8">Стартовият пакет започва от само 200 лв. на месец!</p>
            <button
              onClick={() => setShowDemoForm(true)}
              className="bg-white text-[#0092b5] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Заяви Демо и Научи Повече
            </button>
          </div>
        </div>
      </section>

      {/* How AI Works Section (White) */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0092b5]">Как Работи Cortana AI Поддръжката?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Интелигентни Отговори</h3>
            <p>Cortana използва напреднал изкуствен интелект, за да отговаря на вашите запитвания мигновено.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Персонализирана Помощ</h3>
            <p>AI-то се адаптира към вашите нужди и предлага решения базирани на историята ви.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Денонощна Достъпност</h3>
            <p>Независимо от часа, Cortana е на разположение за поддръжка и съвети.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Лесна Интеграция</h3>
            <p>Започнете бързо – ние се грижим за настройка и поддръжка.</p>
          </div>
        </div>
      </section>

      {/* Demo Form Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            {submitted ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#0092b5]">Благодаря!</h3>
                <p className="text-gray-900">Вашата заявка за демо е изпратена. Ще се свържем с вас скоро.</p>
                <button
                  onClick={() => {
                    setShowDemoForm(false);
                    setSubmitted(false);
                  }}
                  className="mt-4 bg-[#0092b5] text-white py-2 px-4 rounded hover:bg-[#007a99]"
                >
                  Затвори
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6 text-[#0092b5]">Заяви Демо</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-gray-900">Име:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0092b5]"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-gray-900">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0092b5]"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2 text-gray-900">Телефон:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0092b5]"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block mb-2 text-gray-900">Съобщение (опционално):</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0092b5]"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowDemoForm(false)}
                      className="mr-4 text-gray-600"
                    >
                      Отказ
                    </button>
                    <button type="submit" className="bg-[#0092b5] text-white py-2 px-4 rounded hover:bg-[#007a99]">
                      Изпрати
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}