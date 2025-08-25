import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { URLs, useUserDevices, subscribeToDeviceMutate, unsubscribeFromDeviceMutate } from './hooks';
import { mutate } from 'swr';
import jsqr from 'jsqr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faBatteryHalf, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';

// Стилизирани компоненти
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
`;

const DeviceCard = styled.div`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(110, 142, 251, 0.3);
  margin-bottom: 24px;
  color: white;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 16px;
    border-radius: 8px;
    max-width: 85%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

const DeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const DeviceName = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const UnsubscribeButton = styled.button`
  background: linear-gradient(135deg, #e53e3e, #c53030);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #c53030, #9b2c2c);
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 14px;
  }
`;

const CameraButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  display: block;
  max-width: 90%;
  margin: 0 auto;

  &:hover {
    opacity: 0.9;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 14px;
  }
`;

const DeviceDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  p {
    margin: 12px 0;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    
    strong {
      color: white;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    
    p {
      margin: 8px 0;
      font-size: 0.95rem;
    }
  }
`;

const BatteryDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;

  strong {
    color: white;
  }

  @media (max-width: 768px) {
    margin: 8px 0;
    font-size: 0.95rem;
  }
`;

const BatteryIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

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
    width: 90%;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
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

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
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
    padding: 10px;
  }
`;

const ConfirmButton = styled.button`
  background: linear-gradient(135deg, #e53e3e, #c53030);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  min-width: 120px;

  &:hover {
    background: linear-gradient(135deg, #c53030, #9b2c2c);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  background: ${props => 
    props.status === 'active' ? 'rgba(80, 200, 120, 0.3)' :
    props.status === 'inactive' ? 'rgba(239, 68, 68, 0.3)' :
    'rgba(251, 191, 36, 0.3)'
  };
  color: white;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 12px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Video = styled.video`
  max-width: 100%;
  border-radius: 8px;
`;

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
  batteryLevel?: number;
}

const SubscribedDevices: React.FC = () => {
  const { devices } = useUserDevices();
  const [showScanModal, setShowScanModal] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [deviceToUnsubscribe, setDeviceToUnsubscribe] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getBatteryIcon = (level: number | undefined) => {
    if (level === undefined || level === null) return faBatteryEmpty;
    if (level > 50) return faBatteryFull;
    if (level > 20) return faBatteryHalf;
    return faBatteryEmpty;
  };

  const handleScanOpen = () => {
    setShowScanModal(true);
  };

  const handleScanClose = () => {
    setShowScanModal(false);
    stopCamera();
  };

  const handleUnsubscribe = (deviceId: string) => {
    setDeviceToUnsubscribe(deviceId);
    setShowUnsubscribeModal(true);
  };

  const confirmUnsubscribe = async () => {
    if (!deviceToUnsubscribe) return;
    try {
      await unsubscribeFromDeviceMutate(deviceToUnsubscribe);
      setShowUnsubscribeModal(false);
      setDeviceToUnsubscribe(null);
    } catch (error) {
      console.error('Error unsubscribing:', error);
      alert('Грешка при отписване');
    }
  };

  const cancelUnsubscribe = () => {
    setShowUnsubscribeModal(false);
    setDeviceToUnsubscribe(null);
  };

  const startCamera = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanQrCode();
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Грешка при достъп до камерата');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const scanQrCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const scan = async () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsqr(imageData.data, imageData.width, imageData.height);

        if (code) {
          const token = code.data;
          try {
            await subscribeToDeviceMutate(token);
            mutate(URLs.fetchUserDevices);
            alert('Устройството е споделено успешно!');
            handleScanClose();
            return;
          } catch (error) {
            console.error('Error accepting share:', error);
            alert('Грешка при споделяне');
          }
        }
      }
      requestAnimationFrame(scan);
    };

    requestAnimationFrame(scan);
  };

  useEffect(() => {
    if (showScanModal) {
      startCamera();
    }
    return () => stopCamera();
  }, [showScanModal]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active':
        return 'Активно';
      case 'inactive':
        return 'Неактивно';
      default:
        return 'Изчакващо';
    }
  };

  return (
    <Container>
      <Header />
      <PageContainer>
        <PageTitle>Абонирани устройства</PageTitle>
        <SectionTitle>Абонирани устройства</SectionTitle>
        <CameraButton onClick={handleScanOpen} style={{ marginBottom: '20px' }}>
          Сканирай QR код за абониране
        </CameraButton>

        {devices && devices.filter((device: any) => !device.isOwned).length > 0 ? (
          devices.filter((device: any) => !device.isOwned).map((device: Device) => (
            <DeviceCard key={device._id}>
              <DeviceHeader>
                <DeviceName>{device.name}</DeviceName>
              </DeviceHeader>
              <DeviceDetails>
                <div>
                  <p><strong>Име:</strong> {device.name}</p>
                  <p><strong>Тип:</strong> {device.type === 'sensor' ? 'Сензор' : 'Рутер'}</p>
                  <p><strong>Дата на създаване:</strong> {formatDate(device.dateCreated)}</p>
                </div>
                <div>
                  <p><strong>Статус:</strong> <StatusBadge status={device.status}>{getStatusText(device.status)}</StatusBadge></p>
                  <p><strong>Охранява:</strong> {device.protectedItem || 'Не е зададено'}</p>
                  <p><strong>Адрес на клиента:</strong> {device.user.city}, {device.user.address}</p>
                  {device.type === 'sensor' && (
                    <BatteryDisplay>
                      <strong>Батерия:</strong>
                      <BatteryIconStyled icon={getBatteryIcon(device.batteryLevel)} />
                      <span>{device.batteryLevel !== undefined && device.batteryLevel !== null ? `${device.batteryLevel}%` : 'Няма данни'}</span>
                    </BatteryDisplay>
                  )}
                </div>
              </DeviceDetails>
              <ButtonFooter>
                <UnsubscribeButton onClick={() => handleUnsubscribe(device._id)}>
                  Отписване
                </UnsubscribeButton>
              </ButtonFooter>
            </DeviceCard>
          ))
        ) : (
          <InfoText>Нямате абонирани устройства. Сканирайте QR код, за да се абонирате.</InfoText>
        )}
      </PageContainer>
      <Footer />

      {showScanModal && (
        <ModalOverlay onClick={handleScanClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Сканиране на QR код</ModalTitle>
              <CloseButton onClick={handleScanClose}>×</CloseButton>
            </ModalHeader>
            <InfoText>
              Насочете камерата към QR кода, за да получите достъп до споделеното устройство.
            </InfoText>
            <VideoContainer>
              <Video ref={videoRef} />
            </VideoContainer>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <ButtonContainer>
              <CancelButton onClick={handleScanClose}>Отказ</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {showUnsubscribeModal && (
        <ModalOverlay onClick={cancelUnsubscribe}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Отписване от устройство</ModalTitle>
              <CloseButton onClick={cancelUnsubscribe}>×</CloseButton>
            </ModalHeader>
            <InfoText>
              Сигурни ли сте, че искате да се отпишете от това устройство? След отписване няма да получавате повече аларми от него.
            </InfoText>
            <ButtonContainer>
              <CancelButton onClick={cancelUnsubscribe}>Отказ</CancelButton>
              <ConfirmButton onClick={confirmUnsubscribe}>Отпиши ме</ConfirmButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SubscribedDevices;