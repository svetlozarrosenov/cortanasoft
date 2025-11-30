'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import {
  createDeviceMutate,
  generateQaTokenResellMutate,
  installDeviceSoftwareMutate,
  urls,
  useDevices,
} from '@/app/admin/hooks';
import { mutate } from 'swr';
import { FaCopy, FaEye, FaEyeSlash, FaDownload } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import styles from './devices-list.module.css';

interface Device {
  _id: string;
  name: string;
  user: any;
  software: boolean;
  encryptedId: string;
  serialNumber: string;
  privateKey: string;
  dateCreated: string;
  status: 'active' | 'inactive' | 'pending';
  resellId?: string;
  type: string;
}

interface IdCellProps {
  encryptedId: string;
}

const IdCell: React.FC<IdCellProps> = ({ encryptedId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encryptedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Грешка при копиране:', err);
    }
  };

  return (
    <div className={styles.idContainer}>
      <div className={styles.idActions}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={styles.actionButtonSmall}
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
          {isVisible ? ' Скрий' : ' Покажи'}
        </button>
        <button onClick={handleCopy} className={styles.actionButtonSmall}>
          <FaCopy />
          {copied ? ' Копирано!' : ' Копирай'}
        </button>
      </div>
      {isVisible ? (
        <div className={styles.idDisplay}>{encryptedId}</div>
      ) : (
        <div className={styles.hiddenId}>{'•'.repeat(20)}</div>
      )}
    </div>
  );
};

export default function DevicesList() {
  const { devices } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({ type: '' });

  const [filters, setFilters] = useState({
    status: '',
    type: '',
    name: '',
    serialNumber: '',
    email: '',
  });

  const filteredDevices = useMemo(() => {
    if (!devices) return [];
    return devices.filter((device: Device) => {
      const matchesStatus = filters.status ? device.status === filters.status : true;
      const matchesType = filters.type ? device.type === filters.type : true;
      const matchesName = filters.name
        ? device.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchesSerial = filters.serialNumber
        ? device.serialNumber.toLowerCase().includes(filters.serialNumber.toLowerCase())
        : true;
      const matchesEmail = filters.email
        ? device.user?.email?.toLowerCase().includes(filters.email.toLowerCase())
        : true;

      return matchesStatus && matchesType && matchesName && matchesSerial && matchesEmail;
    });
  }, [devices, filters]);

  const handleConfirmAddSoftware = async () => {
    if (!selectedDevice) return;
    await installDeviceSoftwareMutate(selectedDevice._id);
    mutate(urls.fetchDevices);
    setSelectedDevice(null);
  };

  const handleDownloadQR = async (deviceId: string, deviceName: string) => {
    const qrElement = document.getElementById(`qr-${deviceId}`);
    if (!qrElement) return;

    try {
      const canvas = await html2canvas(qrElement, { scale: 2, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `QR-${deviceName}-${deviceId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert('Грешка при изтегляне на QR кода');
    }
  };

  const handleCreateDevice = async () => {
    if (!newDevice.type) {
      alert('Моля, изберете тип на устройството');
      return;
    }
    try {
      await createDeviceMutate(newDevice.type);
      mutate(urls.fetchDevices);
      setIsCreateModalOpen(false);
      setNewDevice({ type: '' });
    } catch (error) {
      alert('Грешка при създаване на устройство');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.title}>
            Списък с <span>устройства</span>
          </h2>
          <button onClick={() => setIsCreateModalOpen(true)} className={styles.createButton}>
            Създай устройство
          </button>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterField}>
            <label>Статус</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Всички статуси</option>
              <option value="active">Активно</option>
              <option value="inactive">Неактивно</option>
              <option value="pending">Изчакващо</option>
            </select>
          </div>
          <div className={styles.filterField}>
            <label>Тип устройство</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Всички типове</option>
              <option value="sensor">Сензор</option>
              <option value="receiver">Приемник</option>
            </select>
          </div>
          <div className={styles.filterField}>
            <label>Сериен номер</label>
            <input
              type="text"
              placeholder="Търси по сериен номер..."
              value={filters.serialNumber}
              onChange={(e) => setFilters({ ...filters, serialNumber: e.target.value })}
            />
          </div>
          <div className={styles.filterField}>
            <label>Имейл на клиент</label>
            <input
              type="text"
              placeholder="Търси по имейл..."
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Име</th>
                <th>Сериен номер</th>
                <th>Дата на поръчка</th>
                <th>Клиент</th>
                <th>Имейл</th>
                <th>Телефон</th>
                <th>ID на устройство</th>
                <th>Ключ</th>
                <th>Софтуер</th>
                <th>Статус</th>
                <th>Действия</th>
                <th>QR Код</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device: Device) => (
                <tr key={device._id}>
                  <td>{device.name}</td>
                  <td>
                    <span className={styles.serialNumber}>{device.serialNumber}</span>
                  </td>
                  <td>{format(new Date(device.dateCreated), 'dd.MM.yyyy')}</td>
                  <td>{device.user?.firstName} {device.user?.lastName}</td>
                  <td>{device.user?.email}</td>
                  <td>{device.user?.phone}</td>
                  <td>
                    <IdCell encryptedId={device.encryptedId} />
                  </td>
                  <td>
                    <IdCell encryptedId={device.privateKey} />
                  </td>
                  <td>{device.software ? 'Да' : 'Не'}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        device.status === 'active'
                          ? styles.active
                          : device.status === 'inactive'
                          ? styles.inactive
                          : styles.pending
                      }`}
                    >
                      {device.status === 'active'
                        ? 'Активно'
                        : device.status === 'inactive'
                        ? 'Неактивно'
                        : 'Изчакващо'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      {!device.software && (
                        <button
                          onClick={() => setSelectedDevice(device)}
                          className={styles.actionButton}
                        >
                          Добави софтуер
                        </button>
                      )}
                      <button
                        onClick={async () => {
                          await generateQaTokenResellMutate(device._id);
                          mutate(urls.fetchDevices);
                        }}
                        className={styles.actionButton}
                      >
                        Генерирай QR
                      </button>
                    </div>
                  </td>
                  <td>
                    {device.resellId && (
                      <div className={styles.qrContainer}>
                        <div id={`qr-${device._id}`} className={styles.qrCode}>
                          <QRCodeSVG value={device.resellId} size={150} />
                        </div>
                        <button
                          onClick={() => handleDownloadQR(device._id, device.name)}
                          className={styles.downloadButton}
                        >
                          <FaDownload /> Изтегли
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Модал за добавяне на софтуер */}
        {selectedDevice && (
          <div className={styles.overlay}>
            <div className={styles.dialog}>
              <h3>Потвърждение</h3>
              <p>
                Сигурни ли сте, че искате да добавите софтуер за устройство{' '}
                <strong>{selectedDevice.name}</strong>?
              </p>
              <div className={styles.dialogActions}>
                <button onClick={() => setSelectedDevice(null)} className={styles.cancelButton}>
                  Не
                </button>
                <button onClick={handleConfirmAddSoftware} className={styles.confirmButton}>
                  Да
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модал за създаване на устройство */}
        {isCreateModalOpen && (
          <div className={styles.overlay}>
            <div className={styles.dialog}>
              <h3>Създай ново устройство</h3>
              <div className={styles.formField}>
                <label>Тип на устройството</label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice({ type: e.target.value })}
                >
                  <option value="">Изберете тип</option>
                  <option value="sensor">Сензор</option>
                  <option value="receiver">Приемник</option>
                </select>
              </div>
              <div className={styles.dialogActions}>
                <button onClick={() => setIsCreateModalOpen(false)} className={styles.cancelButton}>
                  Отказ
                </button>
                <button onClick={handleCreateDevice} className={styles.confirmButton}>
                  Създай
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}