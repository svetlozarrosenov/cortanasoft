import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { acquireDeviceMutate, editDeviceMutate, shareDeviceMutate, URLs, useUserDevices } from './hooks';
import { mutate } from 'swr';
import { QRCodeSVG } from 'qrcode.react';
import jsqr from 'jsqr';
import SubscribersModal from './SubscribersModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faBatteryHalf, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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

const EditButton = styled.button`
  background: white;
  color: #6e8efb;
  border: 2px solid #6e8efb;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: rgba(110, 142, 251, 0.1);
    color: #a777e3;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 14px;
  }
`;

const SubscribersButton = styled.button`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #38a169, #2f855a);
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

const SaveButton = styled(EditButton)`
  min-width: 120px;

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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid rgba(110, 142, 251, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6e8efb;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.95rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 12px;
  }
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
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
  batteryLevel?: number;
  batteryPercentage?: number;
}

const MyDevices: React.FC = () => {
  const { devices } = useUserDevices();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [editValues, setEditValues] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedDeviceForSubscribers, setSelectedDeviceForSubscribers] = useState<Device | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const scanFrameId = useRef<number | null>(null); // Референция за requestAnimationFrame

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { _id: '1', email: 'ivan@example.com', name: 'Иван Иванов' },
    { _id: '2', email: 'maria@example.com', name: 'Мария Петрова' },
  ]);

  const getBatteryIcon = (level: number | undefined) => {
    if (level === undefined || level === null) return faBatteryEmpty;
    if (level > 50) return faBatteryFull;
    if (level > 20) return faBatteryHalf;
    return faBatteryEmpty;
  };

  const handleEdit = (device: Device): void => {
    setSelectedDevice(device);
    setEditValues(device.protectedItem || '');
  };

  const handleSave = async () => {
    if (!selectedDevice) return;
    await editDeviceMutate(selectedDevice._id, editValues);
    mutate(URLs.fetchUserDevices);
    handleClose();
  };

  const handleClose = (): void => {
    setSelectedDevice(null);
    setEditValues('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditValues(e.target.value);
  };

  const handleShare = async (device: Device) => {
    try {
      const token = await shareDeviceMutate(device._id);
      console.log('crb_token', token);
      setShareToken(token);
      setShowShareModal(true);
    } catch (error: any) {
      console.error('Error generating share token:', error);
      alert('Грешка при генериране на споделяне');
    }
  };

  const handleCloseShare = () => {
    setShowShareModal(false);
    setShareToken(null);
  };

  const handleSubscribersOpen = (device: Device) => {
    setSelectedDeviceForSubscribers(device);
    setShowSubscribersModal(true);
  };

  const handleSubscribersClose = () => {
    setShowSubscribersModal(false);
    setSelectedDeviceForSubscribers(null);
  };

  const handleRemoveSubscriber = (subscriberId: string) => {
    setSubscribers(subscribers.filter(sub => sub._id !== subscriberId));
  };

  const handleScanOpen = () => {
    setShowScanModal(true);
  };

  const handleScanClose = () => {
    setShowScanModal(false);
    stopCamera();
    if (scanFrameId.current) {
      cancelAnimationFrame(scanFrameId.current); // Спираме requestAnimationFrame
      scanFrameId.current = null;
    }
  };

  const startCamera = async () => {
    if (videoRef.current) {
      try {
        console.log('Starting camera...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        console.log('Camera started, video playing');
        scanQrCode();
      } catch (error: any) {
        console.error('Error accessing camera:', error);
        alert('Грешка при достъп до камерата: ' + error.message);
      }
    } else {
      console.error('Video ref is not available');
      alert('Грешка: Видео елементът не е наличен');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      console.log('Stopping camera...');
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      console.log('Camera stopped');
    }
  };

  const scanQrCode = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video or canvas ref is missing');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get 2D context for canvas');
      return;
    }

    console.log('Starting QR code scan...');

    const scan = async () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        console.log('Video frame ready, processing...');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsqr(imageData.data, imageData.width, imageData.height);

        if (code) {
          const token = code.data;
          console.log('QR code detected:', token);
          try {
            console.log('Calling acquireDeviceMutate with token:', token);
            await acquireDeviceMutate(token);
            console.log('Device acquired successfully');
            mutate(URLs.fetchUserDevices);
            stopCamera(); // Затваряме камерата
            handleScanClose(); // Затваряме модала и спираме requestAnimationFrame
            navigate('/my-devices'); // Редирект към /my-devices
            return; // Излизаме от функцията
          } catch (error: any) {
            console.error('Error acquiring device:', error);
            alert('Грешка при добавяне на устройство: ' + error.message);
            // Продължаваме сканирането при грешка
          }
        } else {
          console.log('No QR code detected in frame');
        }
      } else {
        console.log('Video not ready, readyState:', video.readyState);
      }
      scanFrameId.current = requestAnimationFrame(scan); // Запазваме ID на анимацията
    };

    scanFrameId.current = requestAnimationFrame(scan);
  };

  useEffect(() => {
    if (showScanModal) {
      startCamera();
    }
    return () => {
      stopCamera();
      if (scanFrameId.current) {
        cancelAnimationFrame(scanFrameId.current); // Спираме requestAnimationFrame при unmount
        scanFrameId.current = null;
      }
    };
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
        <PageTitle>Моите устройства</PageTitle>
        <CameraButton onClick={handleScanOpen} style={{ marginBottom: '20px' }}>
          Добави устройство
        </CameraButton>
        
        {devices && devices.filter((device: any) => device.isOwned).length > 0 ? (
          devices.filter((device: any) => device.isOwned).map((device: Device) => (
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
                  {device.type === 'sensor' && <p><strong>Охранява:</strong> {device.protectedItem || 'Не е зададено'}</p>}
                  <p><strong>Адрес на клиента:</strong> {device.user.city}, {device.user.address}</p>
                  {device.type === 'sensor' && (
                    <BatteryDisplay>
                      <strong>Батерия:</strong>
                      <BatteryIconStyled icon={getBatteryIcon(device.batteryPercentage)} />
                      <span>{device.batteryPercentage !== undefined && device.batteryPercentage !== null ? `${device.batteryPercentage}%` : 'Няма данни'}</span>
                    </BatteryDisplay>
                  )}
                </div>
              </DeviceDetails>
              <ButtonFooter>
                {device.type === 'sensor' && (
                  <>
                    <EditButton onClick={() => handleEdit(device)}>Редактирай</EditButton>
                    <EditButton onClick={() => handleShare(device)}>Сподели</EditButton>
                    <SubscribersButton onClick={() => handleSubscribersOpen(device)}>Абонаменти</SubscribersButton>
                  </>
                )}
              </ButtonFooter>
            </DeviceCard>
          ))
        ) : (
          <InfoText>Нямате регистрирани собствени устройства</InfoText>
        )}
      </PageContainer>
      <Footer />

      {selectedDevice && (
        <ModalOverlay onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Редактиране на {selectedDevice.name}</ModalTitle>
              <CloseButton onClick={handleClose}>×</CloseButton>
            </ModalHeader>
            <Label>Какво охранява това устройство?</Label>
            <InfoText>
              За да можем да Ви предоставим по-точна информация и персонализирани известия, 
              моля посочете какво охранява устройството.
              Например: BMW E90, Електрическо колело, Мотоциклет Honda CBR, Лодка, Каравана, ATV и т.н.
            </InfoText>
            <Input
              name="protectedItem"
              value={editValues}
              onChange={handleChange}
              placeholder="Напр: BMW E90, Електрическо колело, Мотоциклет..."
            />
            <ButtonContainer>
              <CancelButton onClick={handleClose}>Отказ</CancelButton>
              <SaveButton onClick={handleSave}>Запази</SaveButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {showShareModal && (
        <ModalOverlay onClick={handleCloseShare}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Споделяне на устройство</ModalTitle>
              <CloseButton onClick={handleCloseShare}>×</CloseButton>
            </ModalHeader>
            <InfoText>
              Сканирайте този QR код с друго устройство, за да споделите достъп. Този код е валиден 5 минути.
            </InfoText>
            {shareToken && (
              <QRContainer>
                <QRCodeSVG value={shareToken} size={200} />
              </QRContainer>
            )}
            <ButtonContainer>
              <CancelButton onClick={handleCloseShare}>Затвори</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {showScanModal && (
        <ModalOverlay onClick={handleScanClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Сканиране на QR код</ModalTitle>
              <CloseButton onClick={handleScanClose}>×</CloseButton>
            </ModalHeader>
            <InfoText>
              Насочете камерата към QR кода, за да добавите устройство.
            </InfoText>
            <VideoContainer>
              <Video ref={videoRef} autoPlay />
            </VideoContainer>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <ButtonContainer>
              <CancelButton onClick={handleScanClose}>Отказ</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {showSubscribersModal && selectedDeviceForSubscribers && (
        <SubscribersModal
          device={selectedDeviceForSubscribers}
          subscribers={subscribers}
          onClose={handleSubscribersClose}
          onRemoveSubscriber={handleRemoveSubscriber}
        />
      )}
    </Container>
  );
};

export default MyDevices;