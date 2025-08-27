import React from 'react';
import { introContainerStyles, introTextStyles, introOverlayStyles } from './styles';

const Intro: React.FC = () => {
  return (
    <div style={introContainerStyles}>
      <div style={introOverlayStyles}></div>
      <div style={introTextStyles}>
        <h1>Добре дошли в CortanaSoft ERP</h1>
        <p>Вашето решение за управление на бизнеса</p>
      </div>
    </div>
  );
};

export default Intro;