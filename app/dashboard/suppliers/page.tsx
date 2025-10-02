'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useSuppliers, createSupplier, updateSupplier } from '../suppliers/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css';

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
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Доставчици</h3>
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