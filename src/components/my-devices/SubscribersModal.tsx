import React from 'react';
import styled from 'styled-components';
import { useDeviceSubscribers } from './hooks';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 15px rgba(110, 142, 251, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #4a5568;
  transition: color 0.3s ease;

  &:hover {
    color: #2d3748;
  }
`;

const SubscriberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const SubscriberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(110, 142, 251, 0.05);
  border-radius: 8px;
  margin-bottom: 12px;
`;

const SubscriberName = styled.span`
  color: #4a5568;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: linear-gradient(135deg, #e53e3e, #c53030);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #c53030, #9b2c2c);
  }
`;

const InfoText = styled.p`
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 12px 0;
  padding: 12px 16px;
  background: rgba(110, 142, 251, 0.05);
  border-radius: 8px;
  border-left: 4px solid #6e8efb;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CancelButton = styled.button`
  background: white;
  color: #6e8efb;
  border: 2px solid rgba(110, 142, 251, 0.2);
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
  min-width: 120px;

  &:hover {
    background: rgba(110, 142, 251, 0.05);
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface Subscriber {
  _id: string;
  email: string;
  name: string;
}

interface Device {
  _id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  software: boolean;
  jwt: string;
  dateCreated: string;
  protectedItem: string;
  user: any;
  type?: string;
  isOwned?: boolean;
}

interface SubscribersModalProps {
  device: Device;
  subscribers: Subscriber[];
  onClose: () => void;
  onRemoveSubscriber: (subscriberId: string) => void;
}

const SubscribersModal: React.FC<SubscribersModalProps> = ({
  device,
  onClose,
  onRemoveSubscriber,
}) => {
  const { subscribers = [] } = useDeviceSubscribers(device._id);
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Абонаменти за {device.name}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <InfoText>
          Това са потребителите, абонирани за това устройство. Можете да премахнете достъпа им.
        </InfoText>
        {subscribers.length > 0 ? (
          <SubscriberList>
            {subscribers.map((subscriber: any) => (
              <SubscriberItem key={subscriber._id}>
                <SubscriberName>{subscriber.firstName} {subscriber.lastName} ({subscriber.email})</SubscriberName>
                <RemoveButton onClick={() => onRemoveSubscriber(subscriber._id)}>
                  Премахни
                </RemoveButton>
              </SubscriberItem>
            ))}
          </SubscriberList>
        ) : (
          <InfoText>Няма абонирани потребители за това устройство.</InfoText>
        )}
        <ButtonContainer>
          <CancelButton onClick={onClose}>Затвори</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SubscribersModal;