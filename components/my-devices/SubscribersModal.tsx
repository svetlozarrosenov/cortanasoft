'use client';

import React from 'react';
import { useDeviceSubscribers } from '@/app/my-devices/hooks';
import styles from './subscribe-modal.module.css';

interface Subscriber {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface Device {
  _id: string;
  name: string;
}

interface SubscribersModalProps {
  device: Device;
  onClose: () => void;
  onRemoveSubscriber: (subscriberId: string) => void;
}

const SubscribersModal: React.FC<SubscribersModalProps> = ({
  device,
  onClose,
  onRemoveSubscriber,
}) => {
  const { data } = useDeviceSubscribers(device._id);
  const subscribers = data?.subscribers || [];

  return (
    <div className={styles.subscribersModalOverlay} onClick={onClose}>
      <div className={styles.subscribersModalContent} onClick={(e) => e.stopPropagation()}>
        {/* Заглавие */}
        <div className={styles.subscribersModalHeader}>
          <h2 className={styles.subscribersModalTitle}>
            Абонаменти за {device.name}
          </h2>
          <button className={styles.subscribersCloseButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Описание */}
        <p className={styles.subscribersInfoText}>
          Това са потребителите, абонирани за това устройство. Можете да премахнете достъпа им.
        </p>

        {/* Списък с абонаменти */}
        {subscribers.length > 0 ? (
          <ul className={styles.subscriberList}>
            {subscribers.map((sub: Subscriber) => (
              <li key={sub._id} className={styles.subscriberItem}>
                <span className={styles.subscriberName}>
                  {sub.firstName || 'Без име'} {sub.lastName || ''} ({sub.email})
                </span>
                <button
                  onClick={() => onRemoveSubscriber(sub._id)}
                  className={styles.removeButton}
                >
                  Премахни
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.subscribersInfoText}>
            Няма абонирани потребители за това устройство.
          </p>
        )}

        {/* Бутон за затваряне */}
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Затвори
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribersModal;