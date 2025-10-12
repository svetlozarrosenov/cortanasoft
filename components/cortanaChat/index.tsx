'use client';
import React, { useState } from 'react';
import { FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import styles from './cortana.module.css';
import { askCortana } from './hooks';

const CortanaChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Добавяме съобщение на потребителя
    setMessages([...messages, { sender: 'user', text: input }]);
    const userMessage = input;
    setInput('');
    const newMessage = await askCortana(messages);
    // Добавяме отговора на Кортана
    setMessages((prev) => [...prev, { sender: newMessage.role, text: newMessage.content[0].text }]);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Иконка за отваряне/затваряне с известие */}
      {!isOpen && (
        <div className={styles.iconWrapper}>
          <div className={styles.chatNotch}>
            Говори с Кортана!
          </div>
          <button className={styles.chatIcon} onClick={toggleChat}>
            <FaComment />
          </button>
        </div>
      )}

      {/* Чат прозорец */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h4>Cortana Chat</h4>
            <button className={styles.closeButton} onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className={styles.chatForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendButton}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CortanaChat;