'use client';
import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Link from 'next/link';
import { useCompanies, createCompany, updateCompany, useCompanySystemRoles } from './hooks';
import { useCompanyUsers, useUserRole, useUsers } from './[id]/hooks';
import { findTableFields, getDefaultValues } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css';
import DynamicForm from '@/components/form';
import SuccessMessage from '@/components/form/successMessage';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { fields } from './const';
import { useCurrency } from '../supplies/hooks';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Company {
  _id?: string;
  name: string;
  personInChargeId?: string;
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
  const { systemRoles } = useCompanySystemRoles();
  const { currency } = useCurrency();
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(null);
  const { users } = useUsers(currentCompanyId);
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Company>();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const form = useForm({ mode: 'all', defaultValues: getDefaultValues(fields) });

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, "companiesSection", "companiesTable");

      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex,
          width: col.width || 200,
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
        
        if (col.field === 'industry') {
          colDef.valueFormatter = (params) => {
            const chargingMap: Record<string, string> = {
              services: 'Услуги',
              trade: 'Продажби',
            };
            return chargingMap[params.value] || params.value;
          };
        }

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <div className={styles.actions}>
              <FaEdit className={styles.icon} onClick={() => handleEdit(params)} />
            </div>
          );
          colDef.sortable = false;
          colDef.filter = false;
          colDef.width = 150;
          colDef.flex = 0;
          colDef.pinned = 'right';
        }
        return colDef;
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  const handleClose = () => {
    setIsModalOpen(false);
    setBackEndError('');
  };

  const handleEdit = (row: any) => {
    setCurrentCompanyId(row.data._id);
    Object.keys(fields).map((fieldName: any) => {
      form.setValue(fieldName, row.data[fieldName]);
    });
    setCurrentRow(row.data);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: any): Promise<any> => {
    try {
      if (data.logo instanceof File) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.logo);
        });
        data.logo = await base64Promise;
      }

      if (editMode) {
        await updateCompany(currentCompanyId, data);
      } else {
        await createCompany(data);
      }
      setIsVisible(true);
      setIsModalOpen(false);
      mutate();
    } catch (e: any) {
      setBackEndError(e.message);
    }
  };

  const newFields: any = {
    ...fields,
    personInChargeId: {
      ...fields.personInChargeId,
      options: users?.map((user: any) => {
        return {value: user._id, label: `${user.firstName} ${user.lastName} (${user.email})`};
      }),
    },
    currencyId: {
      ...fields.currencyId,
      options: currency?.map((cur: any) => {return {value: cur._id, label: `${cur.code}, ${cur.country}`};}),
    },
    roleInTheSystem: {
      ...fields.roleInTheSystem,
      options: systemRoles?.map((role: any) => {
        return {value: role._id, label: `${role.name}`};
      }),
    },
  };

  return (
    <div className={styles.grid}>
      {<SuccessMessage title="Успешно добавена Компания" message="Компанията е добавена успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicForm form={form} fields={newFields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави компания' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Компании</h3>
        <button onClick={() => setIsModalOpen(true)}>Добави</button>
      </div>
      <div className={styles.table}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            minWidth: 100,
          }}
        />
      </div>
    </div>
  );
}