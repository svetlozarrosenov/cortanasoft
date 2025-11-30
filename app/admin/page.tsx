// app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCreateProduct, useProducts, urls as productApiUrls } from '@/app/products/hooks';
import { useSWRConfig } from 'swr';
import DevicesList from '@/components/admin/devicesList/DevicesList';
import ClientsList from '@/components/admin/clients/ClientsList';
import styles from './admin.module.css';

interface Device {
  id: string;
  name: string;
  model: string;
  type: string;
  description: string;
  image: string;
  price: string;
  serialNumber: string;
}

export default function AdminDashboard() {
  const { products = [] } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();
  const activeMenu = searchParams.get('tab') || 'products';

  const [newDevice, setNewDevice] = useState<Omit<Device, 'id'>>({
    name: '',
    model: '',
    type: '',
    description: '',
    image: '',
    price: '',
    serialNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await useCreateProduct(newDevice);
      mutate(productApiUrls.fetchAllProducts);
      setIsModalOpen(false);
      setNewDevice({
        name: '',
        model: '',
        type: '',
        description: '',
        image: '',
        price: '',
        serialNumber: '',
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const buildLink = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    return `?${params.toString()}`;
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'products':
        return (
          <>
            <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
              Добави продукт
            </button>

            <ul className={styles.deviceList}>
              {products.map((device: any) => (
                <li key={device._id} className={styles.deviceItem}>
                  <div className={styles.deviceInfo}>
                    {device.name} - {device.type}
                  </div>
                  <span className={styles.serialNumber}>{device.serialNumber}</span>
                </li>
              ))}
            </ul>
          </>
        );

      case 'orders':
        return <h2 className={styles.tabHeading}>Поръчки</h2>;
      case 'devices':
        return <DevicesList />;
      case 'clients':
        return <ClientsList />;
      case 'settings':
        return <h2 className={styles.tabHeading}>Настройки</h2>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <ul className={styles.sidebarMenu}>
            <li className={styles.sidebarMenuItem}>
              <Link
                href={buildLink('products')}
                className={`${styles.sidebarMenuLink} ${activeMenu === 'products' ? styles.active : ''}`}
              >
                Продукти
              </Link>
            </li>
            <li className={styles.sidebarMenuItem}>
              <Link
                href={buildLink('devices')}
                className={`${styles.sidebarMenuLink} ${activeMenu === 'devices' ? styles.active : ''}`}
              >
                Устройства
              </Link>
            </li>
            <li className={styles.sidebarMenuItem}>
              <Link
                href={buildLink('clients')}
                className={`${styles.sidebarMenuLink} ${activeMenu === 'clients' ? styles.active : ''}`}
              >
                Клиенти
              </Link>
            </li>
            <li className={styles.sidebarMenuItem}>
              <Link
                href={buildLink('settings')}
                className={`${styles.sidebarMenuLink} ${activeMenu === 'settings' ? styles.active : ''}`}
              >
                Настройки
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>
            Админ <span>Панел</span>
          </h1>

          {renderContent()}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Име на устройството"
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Модел"
                value={newDevice.model}
                onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
                required
                className={styles.input}
              />
              <select
                value={newDevice.type}
                onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                required
                className={styles.select}
              >
                <option value="">Изберете тип</option>
                <option value="sensor">Сензор</option>
                <option value="receiver">Приемник</option>
              </select>
              <textarea
                placeholder="Описание"
                value={newDevice.description}
                onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
                required
                className={styles.textarea}
              />
              <input
                type="text"
                placeholder="URL на снимката"
                value={newDevice.image}
                onChange={(e) => setNewDevice({ ...newDevice, image: e.target.value })}
                required
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Цена"
                value={newDevice.price}
                onChange={(e) => setNewDevice({ ...newDevice, price: e.target.value })}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Сериен номер"
                value={newDevice.serialNumber}
                onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                required
                className={styles.input}
              />

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.primaryButton}>
                  Добави
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.secondaryButton}
                >
                  Затвори
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}