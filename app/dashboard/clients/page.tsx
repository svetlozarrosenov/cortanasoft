'use client';
import { useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Само темата alpine
import styles from '../dashboard.module.css';
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Регистриране на AG Grid модули
ModuleRegistry.registerModules([AllCommunityModule]);

interface Client {
  id: number;
  name: string;
  email: string;
  status: string;
}

export default function ClientsPage() {
  // Състояние за колоните на AG Grid
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
]);

// Column Definitions: Defines the columns to be displayed.
const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
]);

  // Състояние за данните на редовете

  // Състояние за модала
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'Активен' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '' });

  // Функция за отваряне/затваряне на модала
  const handleAddClient = () => {
    setIsModalOpen(true);
  };

  // Функция за затваряне на модала
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', status: 'Активен' });
    setFormErrors({ name: '', email: '' });
  };

  // Функция за обработка на промените във формата
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Функция за валидация на формата
  const validateForm = () => {
    const errors = { name: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Името е задължително';
      isValid = false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Въведете валиден имейл';
      isValid = false;
    }

    setFormErrors(errors);
_vm: return isValid;
  };

  // Функция за изпращане на формата
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Примерна заявка към NestJS API
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newClient = await response.json();
        closeModal();
      } else {
        console.error('Грешка при добавяне на клиент');
      }
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={styles.cardTitle}>Клиенти</h2>
          <button
            onClick={handleAddClient}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави клиент
          </button>
        </div>
        <div style={{ height: 500 }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
        />
        </div>
      </div>

      {/* Модал за добавяне на клиент */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${styles.card} w-full max-w-md`}>
            <h2 className={styles.cardTitle}>Добави нов клиент</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Име
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Имейл
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Статус
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Активен">Активен</option>
                  <option value="Неактивен">Неактивен</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Запази
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}