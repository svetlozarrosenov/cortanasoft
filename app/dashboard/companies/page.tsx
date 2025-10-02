'use client';
import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Link from 'next/link';
import { useCompanies, createCompany, updateCompany } from './hooks';
import { useUserRole } from './[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css';

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
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState([]);

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

  useEffect(() => {
    if(userRole) {
      const table = findTableFields(userRole, "companiesSection", "companiesTable")
 
      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'name') {
          colDef.cellRenderer = (params: any) => (
            <Link
              href={`/dashboard/companies/${params.data._id}`}
              className="text-[#0092b5] hover:underline"
            >
              {params.value}
            </Link>
          );
        }
          
        if (col.field === 'charging') {
          colDef.valueFormatter = (params) => {
            const chargingMap: Record<string, string> = {
              monthly: 'Месечно',
              yearly: 'Годишно',
            };
            return chargingMap[params.value] || params.value;
          };
        }

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <button
              onClick={() => handleEditCompany(params.data)}
              className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
            >
              Редактирай
            </button>
          );
        };
      
        return colDef;
      });
      setColDefs(modifiedColDefs)
    }
  }, [userRole])

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
        await createCompany(data);
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
        <h3 className={styles.title}>Компании</h3>
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