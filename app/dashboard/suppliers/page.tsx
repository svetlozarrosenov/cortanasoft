'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useSuppliers, createSupplier, updateSupplier } from '../suppliers/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';

// Регистриране на AG Grid модули
ModuleRegistry.registerModules([AllCommunityModule]);

interface Supplier {
  _id: string;
  companyName: string;
  responsiblePerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export default function SuppliersPage() {
  const { suppliers: rowData, mutate } = useSuppliers();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing or creating
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null); // Store ID of supplier being edited
  const [formData, setFormData] = useState({
    companyName: '',
    responsiblePerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });
  const [formErrors, setFormErrors] = useState({
    companyName: '',
    responsiblePerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'suppliersSection', 'suppliersTable');
      setColDefs(table);
    }
  }, [userRole]);

  // Add action column for editing
  const actionColumn: ColDef = {
    headerName: 'Действия',
    cellRenderer: (params: any) => (
      <button
        onClick={() => handleEditSupplier(params.data)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded transition duration-200"
      >
        Редактирай
      </button>
    ),
    width: 120,
    pinned: 'right',
  };

  useEffect(() => {
    if (colDefs.length > 0 && !colDefs.some((col) => col.headerName === 'Действия')) {
      setColDefs([...colDefs, actionColumn]);
    }
  }, [colDefs]);

  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  // Функция за отваряне на модал за добавяне
  const handleAddSupplier = () => {
    setFormData({
      companyName: '',
      responsiblePerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
    });
    setIsEditing(false);
    setSelectedSupplierId(null);
    setIsModalOpen(true);
  };

  // Функция за отваряне на модал за редактиране
  const handleEditSupplier = (supplier: Supplier) => {
    setFormData({
      companyName: supplier.companyName,
      responsiblePerson: supplier.responsiblePerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
    });
    setIsEditing(true);
    setSelectedSupplierId(supplier._id);
    setIsModalOpen(true);
  };

  // Функция за затваряне на модала
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedSupplierId(null);
    setFormErrors({
      companyName: '',
      responsiblePerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
    });
  };

  // Функция за обработка на промените във формата
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Функция за валидация на формата
  const validateForm = () => {
    const errors = {
      companyName: '',
      responsiblePerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
    };
    let isValid = true;

    if (!formData.companyName.trim()) {
      errors.companyName = 'Името на компанията е задължително';
      isValid = false;
    }

    if (!formData.responsiblePerson.trim()) {
      errors.responsiblePerson = 'Отговорното лице е задължително';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Имейлът е задължителен';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Въведете валиден имейл';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Телефонът е задължителен';
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = 'Адресът е задължителен';
      isValid = false;
    }

    if (!formData.city.trim()) {
      errors.city = 'Градът е задължителен';
      isValid = false;
    }

    if (!formData.country.trim()) {
      errors.country = 'Държавата е задължителна';
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
      if (isEditing && selectedSupplierId) {
        // Update existing supplier
        await updateSupplier(selectedSupplierId);
      } else {
        // Create new supplier
        await createSupplier(formData);
      }
      mutate();
      closeModal();
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Доставчици</h2>
          <button
            onClick={handleAddSupplier}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави доставчик
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
          />
        </div>
      </div>

      {/* Модал за добавяне/редактиране на доставчик */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {isEditing ? 'Редактирай доставчик' : 'Добави нов доставчик'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Име на компания</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.companyName && <p className="text-red-500 text-sm mt-1">{formErrors.companyName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Отговорно лице</label>
                <input
                  type="text"
                  name="responsiblePerson"
                  value={formData.responsiblePerson}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.responsiblePerson && <p className="text-red-500 text-sm mt-1">{formErrors.responsiblePerson}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Имейл</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Телефон</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Адрес</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Град</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Държава</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
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
                  {isEditing ? 'Запази промените' : 'Запази'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}