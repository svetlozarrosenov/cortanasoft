'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useLocations, createLocation, updateLocation, deleteLocation } from './hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css'

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
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Локации</h3>
      </div>
        <div className={styles.table}>
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
  );
}