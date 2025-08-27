'use client'
import React, { useState } from 'react';
import { sectionStyles, containerStyles, buttonStyles, popupStyles, popupContentStyles, closeStyles, formStyles, inputStyles, submitStyles, titleStyles } from './styles';

const SuccessSection: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>Направете бизнеса си по-успешен с CortanaSoft</h2>
        <button style={buttonStyles} onClick={handleButtonClick}>Заяви демо</button>

        {isPopupOpen && (
          <div style={popupStyles}>
            <div style={popupContentStyles}>
              <span style={closeStyles} onClick={handleClosePopup}>&times;</span>
              <h3>Започнете днес!</h3>
              <p>Нашите специалисти ще се свържат с вас, за да обсъдят възможностите на системата и ще ви предоставят демо акаунт за тестване.</p>
              <form style={formStyles}>
                <input
                  type="text"
                  placeholder="Вашето име"
                  style={inputStyles}
                  required
                />
                <input
                  type="email"
                  placeholder="Вашата електронна поща"
                  style={inputStyles}
                  required
                />
                <button type="submit" style={submitStyles}>Изпрати</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessSection;