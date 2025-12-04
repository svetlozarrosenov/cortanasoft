'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubscribersModal from '@/components/my-devices/SubscribersModal';
import { acquireDeviceMutate, editDeviceMutate, shareDeviceMutate, URLs, useUserDevices } from './hooks';
import { mutate } from 'swr';
import { QRCodeSVG } from 'qrcode.react';
import jsqr from 'jsqr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faBatteryHalf, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import styles from './my-devices.module.css';

interface Device {
  _id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  type?: string;
  isOwned?: boolean;
  protectedItem?: string;
  dateCreated: string;
  user: { city?: string; address?: string };
  batteryPercentage?: number;
}

export default function MyDevices() {
  const router = useRouter();
  const { devices, isLoading } = useUserDevices();

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [currentDeviceForSubs, setCurrentDeviceForSubs] = useState<Device | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanFrameId = useRef<number | null>(null);

  // Батерия иконка
  const getBatteryIcon = (percentage?: number) => {
    if (percentage === undefined || percentage === null) return faBatteryEmpty;
    if (percentage > 50) return faBatteryFull;
    if (percentage > 20) return faBatteryHalf;
    return faBatteryEmpty;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активно';
      case 'inactive': return 'Неактивно';
      default: return 'Изчакващо';
    }
  };

  // === Редактиране ===
  const handleEdit = (device: Device) => {
    setSelectedDevice(device);
    setEditValue(device.protectedItem || '');
  };

  const handleSave = async () => {
    if (!selectedDevice) return;
    await editDeviceMutate(selectedDevice._id, editValue);
    mutate(URLs.fetchUserDevices);
    setSelectedDevice(null);
    setEditValue('');
  };

  const handleCloseEdit = () => {
    setSelectedDevice(null);
    setEditValue('');
  };

  // === Споделяне ===
  const handleShare = async (device: Device) => {
    try {
      const token = await shareDeviceMutate(device._id);
      setShareToken(token);
      setShowShareModal(true);
    } catch (error) {
      alert('Грешка при споделяне на устройството');
    }
  };

  // === Абонаменти ===
  const handleSubscribersOpen = (device: Device) => {
    setCurrentDeviceForSubs(device);
    setShowSubscribersModal(true);
  };

  // === QR сканиране ===
  const handleScanOpen = () => setShowScanModal(true);

  const handleScanClose = () => {
    setShowScanModal(false);
    stopCamera();
    if (scanFrameId.current !== null) {
      cancelAnimationFrame(scanFrameId.current);
      scanFrameId.current = null;
    }
  };

  const startCamera = async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      scanFrameId.current = requestAnimationFrame(scanQrCode);
    } catch (err) {
      alert('Не може да се достъпи камерата');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const scanQrCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsqr(imageData.data, imageData.width, imageData.height);

      if (code) {
        handleTokenScanned(code.data);
        return;
      }
    }

    scanFrameId.current = requestAnimationFrame(scanQrCode);
  };

  const handleTokenScanned = async (token: string) => {
    try {
      await acquireDeviceMutate(token);
      mutate(URLs.fetchUserDevices);
      handleScanClose();
      router.refresh();
    } catch (err) {
      alert('Грешка при добавяне на устройство');
    }
  };

  useEffect(() => {
    if (showScanModal) {
      startCamera();
    }
    return () => {
      stopCamera();
      if (scanFrameId.current !== null) {
        cancelAnimationFrame(scanFrameId.current);
      }
    };
  }, [showScanModal]);

  if (isLoading) {
    return <div className={styles.pageContainer}>Зареждане...</div>;
  }

  const ownedDevices = devices?.filter((d: Device) => d.isOwned) ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Моите устройства</h1>

        <button onClick={handleScanOpen} className={styles.cameraButton}>
          Добави устройство
        </button>

        {ownedDevices.length === 0 ? (
          <p className={styles.infoText}>Нямате регистрирани собствени устройства</p>
        ) : (
          ownedDevices.map((device: any) => (
            <div key={device._id} className={styles.deviceCard}>
              <div className={styles.deviceHeader}>
                <h2 className={styles.deviceName}>{device.name}</h2>
              </div>

              <div className={styles.deviceDetails}>
                <div>
                  <p><strong>Име:</strong> {device.name}</p>
                  <p><strong>Тип:</strong> {device.type === 'sensor' ? 'Сензор' : 'Рутер'}</p>
                  <p><strong>Дата на създаване:</strong> {formatDate(device.dateCreated)}</p>
                </div>
                <div>
                  <p>
                    <strong>Статус:</strong>{' '}
                    <span className={styles.statusBadge} data-status={device.status}>
                      {getStatusText(device.status)}
                    </span>
                  </p>
                  {device.type === 'sensor' && (
                    <p><strong>Охранява:</strong> {device.protectedItem || 'Не е зададено'}</p>
                  )}
                  <p>
                    <strong>Адрес на клиента:</strong>{' '}
                    {device.user?.city && `${device.user.city}, `}{device.user?.address || '—'}
                  </p>
                  {device.type === 'sensor' && (
                    <div className={styles.batteryDisplay}>
                      <strong>Батерия:</strong>
                      <FontAwesomeIcon icon={getBatteryIcon(device.batteryPercentage)} />
                      <span>
                        {device.batteryPercentage != null ? `${device.batteryPercentage}%` : 'Няма данни'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {device.type === 'sensor' && (
                <div className={styles.buttonFooter}>
                  <button onClick={() => handleEdit(device)} className={styles.editButton}>
                    Редактирай
                  </button>
                  <button onClick={() => handleShare(device)} className={styles.editButton}>
                    Сподели
                  </button>
                  <button onClick={() => handleSubscribersOpen(device)} className={styles.subscribersButton}>
                    Абонаменти
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Редактиране */}
      {selectedDevice && (
        <div className={styles.modalOverlay} onClick={handleCloseEdit}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Редактиране на {selectedDevice.name}</h2>
              <button className={styles.closeButton} onClick={handleCloseEdit}>×</button>
            </div>
            <label className={styles.label}>Какво охранява това устройство?</label>
            <p className={styles.infoText}>
              За да можем да Ви предоставим по-точна информация и персонализирани известия, моля посочете какво охранява устройството.
              Например: BMW E90, Електрическо колело, Мотоциклет Honda CBR, Лодка, Каравана, ATV и т.н.
            </p>
            <input
              className={styles.input}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Напр: BMW E90, Електрическо колело..."
            />
            <div className={styles.buttonContainer}>
              <button className={styles.cancelButton} onClick={handleCloseEdit}>Отказ</button>
              <button className={styles.saveButton} onClick={handleSave}>Запази</button>
            </div>
          </div>
        </div>
      )}

      {/* Споделяне */}
      {showShareModal && shareToken && (
        <div className={styles.modalOverlay} onClick={() => setShowShareModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Споделяне на устройство</h2>
              <button className={styles.closeButton} onClick={() => setShowShareModal(false)}>×</button>
            </div>
            <p className={styles.infoText}>
              Сканирайте този QR код с друго устройство, за да споделите достъп. Този код е валиден 5 минути.
            </p>
            <div className={styles.qrContainer}>
              <QRCodeSVG value={shareToken} size={200} />
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.cancelButton} onClick={() => setShowShareModal(false)}>
                Затвори
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Сканиране на QR */}
      {showScanModal && (
        <div className={styles.modalOverlay} onClick={handleScanClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Сканиране на QR код</h2>
              <button className={styles.closeButton} onClick={handleScanClose}>×</button>
            </div>
            <p className={styles.infoText}>
              Насочете камерата към QR кода, за да добавите устройство.
            </p>
            <div className={styles.videoContainer}>
              <video ref={videoRef} autoPlay playsInline className={styles.video} />
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className={styles.buttonContainer}>
              <button className={styles.cancelButton} onClick={handleScanClose}>
                Отказ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Абонаменти модал */}
      {showSubscribersModal && currentDeviceForSubs && (
        <SubscribersModal
          device={currentDeviceForSubs}
          onClose={() => setShowSubscribersModal(false)}
          onRemoveSubscriber={(id) => {
            // Тук ще добавиш реалното изтриване
            console.log('Премахни абонамент:', id);
          }}
        />
      )}
    </div>
  );
}