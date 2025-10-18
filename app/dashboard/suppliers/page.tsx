'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useSuppliers, createSupplier, updateSupplier } from '../suppliers/hooks';
import { useCompanyUsers, useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css';
import SuccessMessage from '@/components/form/successMessage';
import DynamicForm from '@/components/form';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash } from 'react-icons/fa';
import classNames from 'classnames';
import { fields } from './const';

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
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Location>();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const { users } = useCompanyUsers();

  const newFields: any = {
    ...fields,
    responsiblePerson: {
      ...fields.responsiblePerson,
      options: users?.map((user: any) => {
        return {value: user._id, label: user.firstName + ' ' + user.lastName}
      })
    },
  }

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any) : Promise<any> => {
    try {
      if(editMode) {
       await updateSupplier(currentRow);
      } else {
        await createSupplier(data);
      }
      setIsVisible(true);
      setIsModalOpen(false);
      mutate();
    } catch(e: any) {
      setBackEndError(e.message);
    }
  }

  const handleEdit = (row: any) => {
    Object.keys(fields).map((fieldName: any) => {
      form.setValue(fieldName, row.data[fieldName]);
    })
    setCurrentRow(row.data);
    setEditMode(true);
    setIsModalOpen(true);
  }
  
  const handleDelete = async (params: any) => {
    const orderId = params.data._id;
    if (confirm('Сигурни ли сте, че искате да изтриете тази поръчка?')) {
      // await deleteLocation(orderId);
      mutate();
    }
  };

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'suppliersSection', 'suppliersTable');

      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };
        
        if (col.field === 'actions') {
            colDef.cellRenderer = (params: any) => (
              <div className={styles.actions}>
                <FaEdit className={styles.icon} onClick={() => handleEdit(params)} />
                <FaTrash className={classNames(styles.icon, styles.iconTrash)} onClick={() => handleDelete(params)} />
              </div>
            );
            colDef.sortable = false;
            colDef.filter = false;
            colDef.width = 150;
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
  }


  return (
    <div className={styles.grid}>
      {<SuccessMessage title="Успешно добавен Доставчик" message="Доставчикът е добавен успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicForm form={form} fields={newFields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави доставчик' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Доставчици</h3>
        <button onClick={() => setIsModalOpen(true)}>Добави</button>
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