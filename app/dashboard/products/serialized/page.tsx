'use client';
import { useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Само темата alpine
import styles from '../../dashboard.module.css';
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { createProduct, updateProduct, useProducts } from '../all/hooks';

// Регистриране на AG Grid модули
ModuleRegistry.registerModules([AllCommunityModule]);

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export default function ProductsPage() {
  const { products: rowData, mutate } = useProducts();

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef<Product>[]>([
    { field: "name", headerName: "Име", filter: true, flex: 1 },
    { field: "description", headerName: "Описание", filter: true, flex: 1 },
    { field: "price", headerName: "Цена", filter: true, valueFormatter: (params) => `${params.value} лв.` },
    { field: "quantity", headerName: "Наличност", filter: true, editable: true }, // Директно редактируема колона за наличност
    { field: "category", headerName: "Категория", filter: true },
    {
      headerName: "Действия",
      width: 150,
      cellRenderer: (params: any) => (
        <button
          onClick={() => handleEditProduct(params.data)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded text-sm"
        >
          Редактирай
        </button>
      ),
    },
  ]);

  // Състояние за модала
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, quantity: 0, category: '' });
  const [formErrors, setFormErrors] = useState({ name: '', price: '', quantity: '' });

  // Функция за отваряне на модал за добавяне
  const handleAddProduct = () => {
    setIsEditMode(false);
    setFormData({ name: '', description: '', price: 0, quantity: 0, category: '' });
    setIsModalOpen(true);
  };

  // Функция за отваряне на модал за редактиране
  const handleEditProduct = (product: Product) => {
    setIsEditMode(true);
    setFormData(product);
    setIsModalOpen(true);
  };

  // Функция за затваряне на модала
  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ name: '', price: '', quantity: '' });
  };

  // Функция за обработка на промените във формата
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'price' || name === 'quantity' ? Number(value) : value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Функция за валидация на формата
  const validateForm = () => {
    const errors = { name: '', price: '', quantity: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Името е задължително';
      isValid = false;
    }

    if (formData.price <= 0) {
      errors.price = 'Цената трябва да е по-голяма от 0';
      isValid = false;
    }

    if (formData.quantity < 0) {
      errors.quantity = 'Наличността не може да е отрицателна';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Функция за изпращане на формата
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditMode) {
        console.log('crb_formData', formData)
        await updateProduct(formData);
      } else {
        await createProduct(formData);
      }
      mutate();
      closeModal();
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  // Обработка на директна промяна в клетка (напр. наличност)
  const handleCellValueChanged = async (event: any) => {
    try {
      await updateProduct(event.data._id);
      mutate();
    } catch (error) {
      console.error('Грешка при обновяване на продукта:', error);
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={styles.cardTitle}>Продукти</h2>
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави продукт
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            onCellValueChanged={handleCellValueChanged}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>

      {/* Модал за добавяне/редактиране на продукт */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${styles.card} w-full max-w-md`}>
            <h2 className={styles.cardTitle}>{isEditMode ? 'Редактирай продукт' : 'Добави нов продукт'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Име</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Описание</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Цена</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Наличност</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.quantity && <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Категория</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
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