'use client';
import React, { useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Link from 'next/link';
import { useCompanies, createCompany, updateCompany } from './hooks';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Company {
  _id?: string;
  name: string;
  personInCharge: string;
  vatNumber?: string;
  eik: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  industry: string;
  price: string;
  charging: 'monthly' | 'yearly';
  roleInTheSystem: string;
}

export default function CompaniesPage() {
  const { companies: rowData, mutate } = useCompanies();

  const [colDefs] = useState<ColDef<Company>[]>([
    {
      field: 'name',
      headerName: 'Име на компанията',
      filter: true,
      flex: 1,
      cellRenderer: (params: any) => (
        <Link
          href={`/dashboard/companies/${params.data._id}`}
          className="text-[#0092b5] hover:underline"
        >
          {params.value}
        </Link>
      ),
    },
    { field: 'description', headerName: 'Описание', filter: true, flex: 1 },
    { field: 'industry', headerName: 'Индустрия', filter: true },
    { field: 'email', headerName: 'Имейл за контакт', filter: true },
    { field: 'phone', headerName: 'Телефон за контакт', filter: true },
    { field: 'eik', headerName: 'ЕИК номер', filter: true },
    { field: 'vatNumber', headerName: 'ДДС номер', filter: true },
    { field: 'personInCharge', headerName: 'МОЛ', filter: true },
    { field: 'country', headerName: 'Държава', filter: true },
    { field: 'city', headerName: 'Град', filter: true },
    { field: 'address', headerName: 'Адрес', filter: true },
    { field: 'price', headerName: 'Цена', filter: true },
    {
      field: 'charging',
      headerName: 'Таксуване',
      filter: true,
      valueFormatter: (params) => {
        const chargingMap: Record<string, string> = {
          monthly: 'Месечно',
          yearly: 'Годишно',
        };
        return chargingMap[params.value] || params.value;
      },
    },
    { field: 'roleInTheSystem', headerName: 'Роля в системата', filter: true },
    {
      headerName: 'Действия',
      width: 150,
      cellRenderer: (params: any) => (
        <button
          onClick={() => handleEditCompany(params.data)}
          className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
        >
          Редактирай
        </button>
      ),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Company>({
    name: '',
    personInCharge: '',
    vatNumber: '',
    eik: '',
    country: '',
    city: '',
    address: '',
    email: '',
    phone: '',
    description: '',
    industry: '',
    price: '',
    charging: 'monthly',
    roleInTheSystem: 'client',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    personInCharge: '',
    eik: '',
  });

  const handleAddCompany = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      personInCharge: '',
      vatNumber: '',
      eik: '',
      country: '',
      city: '',
      address: '',
      email: '',
      phone: '',
      description: '',
      industry: '',
      price: '',
      charging: 'monthly',
      roleInTheSystem: 'client',
    });
    setFormErrors({ name: '', personInCharge: '', eik: '' });
    setIsModalOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setIsEditMode(true);
    setFormData(company);
    setFormErrors({ name: '', personInCharge: '', eik: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ name: '', personInCharge: '', eik: '' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { name: '', personInCharge: '', eik: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Името на компанията е задължително';
      isValid = false;
    }

    if (!formData.personInCharge.trim()) {
      errors.personInCharge = 'МОЛ е задължителен';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = { ...formData };
      if (isEditMode) {
        await updateCompany(data);
      } else {
        console.log('crb_data', data)
        await createCompany(data);
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
          <h2 className="text-lg font-semibold text-white">Компании</h2>
          <button
            onClick={handleAddCompany}
            className="bg-white text-[#0092b5] font-semibold py-2 px-4 rounded transition duration-200 hover:bg-gray-100"
          >
            Добави компания
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
          />
        </div>
      </div>

      {/* Модал за добавяне/редактиране на компания */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              {isEditMode ? 'Редактирай компания' : 'Добави нова компания'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Име на компанията</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Описание</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Индустрия</label>
                <select
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                >
                  <option value="">Избери индустрия...</option>
                  <option value="trade">Търговия</option>
                  <option value="manufacturing">Производство</option>
                  <option value="services">Услуги</option>
                  <option value="other">Друго</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Имейл за контакт</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Телефон за контакт</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">ЕИК номер</label>
                <input
                  type="text"
                  name="eik"
                  value={formData.eik}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {formErrors.eik && <p className="text-red-400 text-sm mt-1">{formErrors.eik}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">ДДС номер</label>
                <input
                  type="text"
                  name="vatNumber"
                  value={formData.vatNumber || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">МОЛ</label>
                <input
                  type="text"
                  name="personInCharge"
                  value={formData.personInCharge}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {formErrors.personInCharge && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.personInCharge}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Държава</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Град</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Адрес</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Цена</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Таксуване</label>
                <select
                  name="charging"
                  value={formData.charging}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                >
                  <option value="monthly">Месечно</option>
                  <option value="yearly">Годишно</option>
                </select>
              </div>
              <input type="hidden" name="roleInTheSystem" value="client" />
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-2 px-4 rounded transition duration-200"
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