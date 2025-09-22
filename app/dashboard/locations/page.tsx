'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useLocations, createLocation, updateLocation, deleteLocation } from './hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Location {
  _id?: string;
  name: string;
  type: 'warehouse' | 'store' | 'bin';
  address?: string;
  country?: string;
  city?: string;
  email?: string;
  phone?: string;
  description?: string;
}

export default function LocationsPage() {
  const { locations: rowData, mutate } = useLocations();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);
  const [locationToEdit, setLocationToEdit] = useState<Location | null>(null);
  const [formData, setFormData] = useState<Location>({
    name: '',
    type: 'warehouse',
    address: '',
    country: '',
    city: '',
    email: '',
    phone: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    type: '',
    address: '',
    country: '',
    city: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, "locationsSection", "locationsTable");
      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
          width: col.width,
          minWidth: col.minWidth
        };

        if (col.field === 'type') {
          colDef.valueFormatter = (params) => {
            const typeMap: Record<string, string> = {
              warehouse: 'Склад',
              store: 'Магазин',
              bin: 'Позиция',
            };
            return typeMap[params.value] || params.value;
          };
        }

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleEditLocation(params.data)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
              >
                Редактирай
              </button>
              <button
                onClick={() => {
                  setLocationToDelete(params.data);
                  setIsDeleteConfirmOpen(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
              >
                Изтрий
              </button>
            </div>
          );
        }

        return colDef;
      });
      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  const handleAddLocation = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      type: 'warehouse',
      address: '',
      country: '',
      city: '',
      email: '',
      phone: '',
      description: '',
    });
    setFormErrors({ name: '', type: '', address: '', country: '', city: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleDeleteLocation = async () => {
    if (locationToDelete?._id) {
      await deleteLocation(locationToDelete._id);
      mutate();
      setIsDeleteConfirmOpen(false);
      setLocationToDelete(null);
    }
  };

  const handleEditLocation = (location: Location) => {
    setLocationToEdit(location);
    setIsEditMode(true);
    setFormData({
      name: location.name,
      type: location.type,
      address: location.address || '',
      country: location.country || '',
      city: location.city || '',
      email: location.email || '',
      phone: location.phone || '',
      description: location.description || '',
    });
    setFormErrors({ name: '', type: '', address: '', country: '', city: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ name: '', type: '', address: '', country: '', city: '', email: '', phone: '' });
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmOpen(false);
    setLocationToDelete(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { name: '', type: '', address: '', country: '', city: '', email: '', phone: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Името е задължително';
      isValid = false;
    }

    if (!formData.type) {
      errors.type = 'Типът е задължителен';
      isValid = false;
    }

    if (!formData.address?.trim()) {
      errors.address = 'Адресът е задължителен';
      isValid = false;
    }

    if (!formData.country?.trim()) {
      errors.country = 'Държавата е задължителна';
      isValid = false;
    }

    if (!formData.city?.trim()) {
      errors.city = 'Градът е задължителен';
      isValid = false;
    }

    if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Въведете валиден имейл';
      isValid = false;
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Телефонът е задължителен';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = {
        ...formData,
      };
      if (isEditMode) {
        await updateLocation(locationToEdit?._id, data);
      } else {
        await createLocation(data);
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
          <h2 className="text-lg font-semibold text-white">Локации</h2>
          <button
            onClick={handleAddLocation}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави локация
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
              {isEditMode ? 'Редактирай локация' : 'Добави нова локация'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Име</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Тип</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери тип...</option>
                  <option value="warehouse">Склад</option>
                  <option value="store">Магазин</option>
                  <option value="bin">Позиция</option>
                </select>
                {formErrors.type && <p className="text-red-400 text-sm mt-1">{formErrors.type}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Адрес</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.address && <p className="text-red-400 text-sm mt-1">{formErrors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Държава</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.country && <p className="text-red-400 text-sm mt-1">{formErrors.country}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Град</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.city && <p className="text-red-400 text-sm mt-1">{formErrors.city}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Имейл</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Телефон</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Описание</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
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

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-white mb-4">Потвърждение за изтриване</h2>
            <p className="text-white mb-4">Сигурни ли сте, че искате да изтриете локацията "{locationToDelete?.name}"?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDeleteConfirmModal}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Отказ
              </button>
              <button
                onClick={handleDeleteLocation}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Изтрий
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}