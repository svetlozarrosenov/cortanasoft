// app/admin/components/ClientsList.tsx
'use client';

import React, { useState } from 'react';
import { useClients } from '@/app/admin/hooks';
import styles from './clients-list.module.css';

interface Device {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  serialNumber: string;
  type: string;
  lastUpdated: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  devices: Device[];
}

export default function ClientsList() {
  const { clients } = useClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleShowDevices = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <div>
      <h2 className={styles.title}>
        Списък с <span>клиенти</span>
      </h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Име</th>
              <th>Имейл</th>
              <th>Адрес</th>
              <th>Телефон</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client: Client, index: number) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.address}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    onClick={() => handleShowDevices(client)}
                    className={styles.actionButton}
                  >
                    Устройства
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модал с устройствата */}
      {selectedClient && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={handleCloseModal} className={styles.closeButton}>
              ×
            </button>

            <h3 className={styles.modalTitle}>
              Устройства на {selectedClient.name}
            </h3>

            <ul className={styles.deviceList}>
              {selectedClient.devices.map((device) => (
                <li key={device.id} className={styles.deviceItem}>
                  <div className={styles.deviceDetail}>
                    <strong>Име:</strong> {device.name}
                  </div>
                  <div className={styles.deviceDetail}>
                    <strong>Сериен номер:</strong> {device.serialNumber}
                  </div>
                  <div className={styles.deviceDetail}>
                    <strong>Тип:</strong> {device.type}
                  </div>
                  <div className={styles.deviceDetail}>
                    <strong>Статус:</strong>{' '}
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
                  </div>
                  <div className={styles.deviceDetail}>
                    <strong>Последна актуализация:</strong>{' '}
                    {new Date(device.lastUpdated).toLocaleDateString('bg-BG')}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}