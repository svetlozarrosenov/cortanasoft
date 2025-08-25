import type { CSSProperties } from 'react';

export const introContainerStyles: CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
};

export const introOverlayStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url("https://example.com/full-screen-community.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.7)',
  zIndex: 1,
};

export const introTextStyles: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
};

export const introHeadingStyles: CSSProperties = {
  fontSize: '48px',
  marginBottom: '20px',
  color: '#1E90FF', 
};

export const introParagraphStyles: CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
};