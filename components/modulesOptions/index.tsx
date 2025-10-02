import React, { useState } from 'react';
import { sectionStyles, containerStyles, titleStyles, basePriceStyles, optionStyles, totalStyles } from './styles';

const ModulesOptions: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const basePrice = 200;
  const optionPrices = {
    'inventory': 50,
    'payroll': 70,
    'analytics': 90,
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  // const totalPrice = basePrice + selectedOptions.reduce((sum, option) => sum + (optionPrices[option] || 0), 0);

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>Модули и опции</h2>
        <p style={basePriceStyles}>Стандартен пакет: 200 лв (включва основни модули за управление)</p>
        <div style={optionStyles}>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('inventory')}
              onChange={() => handleOptionChange('inventory')}
            /> Инвентаризация (+50 лв)
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('payroll')}
              onChange={() => handleOptionChange('payroll')}
            /> Заплати (+70 лв)
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('analytics')}
              onChange={() => handleOptionChange('analytics')}
            /> Анализи (+90 лв)
          </label>
        </div>
        <p style={totalStyles}>Обща цена: {67677} лв</p>
      </div>
    </section>
  );
};

export default ModulesOptions;