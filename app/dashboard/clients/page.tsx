'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createClient, useClients } from './hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Client {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
}

export default function ClientsPage() {
  const { clients: rowData, mutate } = useClients();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Client>({
    _id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'clientsSection', 'clientsTable') || [];

      const modifiedColDefs: ColDef[] = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        // Прилагане на valueFormatter за специфични колони
        if (col.field === 'email') {
          colDef.valueFormatter = (params) => params.value || '-';
        }
        if (col.field === 'phone') {
          colDef.valueFormatter = (params) => params.value || '-';
        }
        if (col.field === 'city') {
          colDef.valueFormatter = (params) => params.value || '-';
        }
        if (col.field === 'country') {
          colDef.valueFormatter = (params) => params.value || '-';
        }

        return colDef;
      });

      // Добавяне на колона за действия
      modifiedColDefs.push({
        headerName: 'Действия',
        width: 150,
        pinned: 'right',
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleEditClient(params.data)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
          >
            Редактирай
          </button>
        ),
        sortable: false,
        filter: false,
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  // Добавяне на gridOptions за стилизиране на редовете
  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  const handleAddClient = () => {
    setIsEditMode(false);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      country: '',
    });
    setFormErrors({ firstName: '', email: '', phone: '', city: '', country: '' });
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setIsEditMode(true);
    setFormData({
      firstName: client.firstName,
      middleName: client.middleName || '',
      lastName: client.lastName || '',
      email: client.email,
      phone: client.phone || '',
      city: client.city || '',
      country: client.country || '',
    });
    setFormErrors({ firstName: '', email: '', phone: '', city: '', country: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ firstName: '', email: '', phone: '', city: '', country: '' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { firstName: '', email: '', phone: '', city: '', country: '' };
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = 'Името е задължително';
      isValid = false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Въведете валиден имейл';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Телефонът е задължителен';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await createClient(formData);
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
          <h2 className="text-lg font-semibold text-white">Клиенти</h2>
          <button
            onClick={handleAddClient}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави клиент
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              {isEditMode ? 'Редактирай клиент' : 'Добави нов клиент'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Име</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.firstName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Бащино име</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Фамилно име</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Имейл</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Държава</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.country && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.country}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Град</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.city && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.city}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Телефон</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.phone && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
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