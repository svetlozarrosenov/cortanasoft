import React from 'react';
import { sectionStyles, containerStyles, boxStyles, boxTitleStyles, boxTextStyles } from './styles';

const WhyChoose: React.FC = () => {
  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={boxTitleStyles}>Защо да изберете CortanaSoft?</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={boxStyles}>
            <h3 style={boxTitleStyles}>Интуитивен интерфейс</h3>
            <p style={boxTextStyles}>Лесен за използване дизайн, подходящ за всички нива.</p>
          </div>
          <div style={boxStyles}>
            <h3 style={boxTitleStyles}>Мощни модули</h3>
            <p style={boxTextStyles}>Оптимизирайте бизнеса си с напреднали функции.</p>
          </div>
          <div style={boxStyles}>
            <h3 style={boxTitleStyles}>24/7 Поддръжка</h3>
            <p style={boxTextStyles}>Винаги сме тук, за да ви помогнем.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;