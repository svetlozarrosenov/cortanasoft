'use client'
import React, { useState } from 'react';

export default function About() {
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
      {/* Intro Section (White) */}
      <section className="bg-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0092b5]">За Cortana Soft</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-900">
          Ние сме екип от страстни професионалисти, които създават иновативни CRM и ERP решения, за да помогнат на бизнеса в България да процъфтява.
        </p>
      </section>

      {/* Our Story Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Нашата История</h2>
          <p className="text-lg mb-6">
            Cortana Soft е основана с мисията да предостави на българските бизнеси мощни, лесни за използване и достъпни софтуерни решения. Вдъхновени от нуждите на малките и средни предприятия, ние разработихме интелигентна CRM и ERP система, подкрепена от нашия уникален AI асистент – Cortana.
          </p>
          <p className="text-lg mb-6">
            Нашата цел е да направим бизнес управлението по-ефективно, прозрачно и адаптивно. С фокус върху българския пазар, ние предлагаме локализирани решения, които отговарят на специфичните нужди и регулации.
          </p>
        </div>
      </section>

      {/* Our Team Section (White) */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[#0092b5]">Нашият Екип</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
              <h3 className="text-2xl font-semibold mb-4">Експерти с Над 10 Години Опит</h3>
              <p>
                Нашите програмисти имат над 10 години опит в разработката на софтуерни решения за бизнеси. Те комбинират техническа експертиза с дълбоко разбиране за нуждите на клиентите, за да създадат надеждни и иновативни продукти.
              </p>
            </div>
            <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
              <h3 className="text-2xl font-semibold mb-4">Страст към Иновациите</h3>
              <p>
                Екипът ни е посветен на разработването на технологии, които правят разлика. От AI поддръжка до интуитивни интерфейси, ние сме тук, за да улесним работата ви.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Нашата Мисия</h2>
          <p className="text-lg mb-6">
            В Cortana Soft вярваме, че всеки бизнес заслужава достъп до модерни технологии. Нашата мисия е да предоставим интелигентни, достъпни и лесни за използване решения, които помагат на българските компании да растат и да бъдат конкурентоспособни.
          </p>
          <p className="text-lg mb-6">
            С Cortana – нашия AI асистент – ние предлагаме не просто софтуер, а партньор, който е с вас 24/7, за да отговори на въпроси, да реши проблеми и да оптимизира процесите ви.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section (White) */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0092b5]">Защо да Изберете Cortana Soft?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Локализирани Решения</h3>
            <p>Нашата система е създадена с мисъл за българския пазар, поддържайки местни регулации и нужди.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">Достъпни Цени</h3>
            <p>Предлагаме стартов пакет от 200 лв./месец, достъпен за малки и средни бизнеси.</p>
          </div>
          <div className="bg-[#0092b5] p-6 rounded-lg shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-4">24/7 AI Поддръжка</h3>
            <p>Cortana е винаги на разположение, за да ви помогне с всякакви въпроси или предизвикателства.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section (White) */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#0092b5]">Готови ли сте да научите повече?</h2>
        <button
          onClick={() => setShowDemoForm(true)}
          className="bg-[#0092b5] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#007a99] transition"
        >
          Заяви Демо Сега
        </button>
      </section>

      {/* Demo Form Modal (White) */}
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