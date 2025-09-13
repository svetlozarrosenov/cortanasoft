'use client'
import React, { useState } from 'react';

export default function Contact() {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Грешка при изпращане на съобщението. Моля, опитайте отново.');
      }
    } catch (error) {
      alert('Грешка при изпращане на съобщението. Моля, опитайте отново.');
      console.error(error);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Intro Section (White) */}
      <section className="bg-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0092b5]">Свържете се с Cortana Soft</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-900">
          Имате въпроси или искате да научите повече за нашите CRM и ERP решения? Нашият екип и AI асистентът Cortana са тук, за да ви помогнат!
        </p>
      </section>

      {/* Contact Information Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Нашите Контакти</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-900 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Имейл</h3>
              <p className="text-lg">Изпратете ни имейл на:</p>
              <a href="mailto:support@cortanasoft.com" className="text-[#0092b5] hover:underline">
                support@cortanasoft.com
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-900 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Телефон</h3>
              <p className="text-lg">Обадете ни се на:</p>
              <a href="tel:+359123456789" className="text-[#0092b5] hover:underline">
                +359 123 456 789
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-900 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#0092b5]">Офис</h3>
              <p className="text-lg">Посетете ни на:</p>
              <p className="text-[#0092b5]">ул. Бизнес Център 10, София, България</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section (White) */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0092b5]">Изпратете Ни Съобщение</h2>
          {submitted ? (
            <div className="text-center bg-[#0092b5] p-8 rounded-lg shadow-md text-white">
              <h3 className="text-2xl font-bold mb-4">Благодаря!</h3>
              <p className="text-lg">Вашето съобщение е изпратено успешно. Ще се свържем с вас възможно най-скоро.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-white text-[#0092b5] py-2 px-4 rounded hover:bg-gray-100"
              >
                Изпрати Ново Съобщение
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#0092b5] p-8 rounded-lg shadow-md text-white">
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-lg font-semibold">
                  Име:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-lg font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 text-lg font-semibold">
                  Телефон:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-lg font-semibold">
                  Съобщение:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                  rows={5}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-white text-[#0092b5] py-3 px-6 rounded-lg hover:bg-gray-100 transition"
                >
                  Изпрати
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* AI Support Section (Blue) */}
      <section className="py-16 px-4 md:px-8 bg-[#0092b5] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">24/7 Поддръжка от Cortana AI</h2>
          <p className="text-lg mb-6">
            Нашият AI асистент Cortana е на разположение денонощно, за да отговори на вашите въпроси и да ви помогне с нашата CRM и ERP система. Опитайте го още днес!
          </p>
          <button
            onClick={() => setSubmitted(true)} // Замени с логика за стартиране на AI чат, ако има такъв
            className="bg-white text-[#0092b5] py-3 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Говори с Cortana
          </button>
        </div>
      </section>

      {/* Call to Action Section (White) */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#0092b5]">Готови ли сте да трансформирате бизнеса си?</h2>
        <button
          onClick={() => setSubmitted(false)} // Замени с логика за демо заявка, ако е различна от контактната форма
          className="bg-[#0092b5] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#007a99] transition"
        >
          Заяви Демо Сега
        </button>
      </section>
    </main>
  );
}