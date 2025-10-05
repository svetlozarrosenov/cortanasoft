'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createClient, updateClient, useClients } from './hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import { fields } from './const';
import DynamicForm from '@/components/form';
import { useForm } from 'react-hook-form';
import styles from '../dashboard-grid.module.css';
import { FaEdit } from 'react-icons/fa';
import SuccessMessage from '@/components/form/successMessage';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Client {
  _id?: string;
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
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Client>();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any) : Promise<any> => {
    try {
      if(editMode) {
       await updateClient(currentRow?._id, data);
      } else {
        await createClient(data);
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
        return colDef;
      });

      modifiedColDefs.push({
        headerName: 'Действия',
        width: 150,
        pinned: 'right',
        cellRenderer: (params: any) => (
          <FaEdit className={styles.icon} onClick={() => handleEdit(params)} />
        ),
        sortable: false,
        filter: false,
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
      {<SuccessMessage title="Успешно добавен клиент" message="Клиентът е добавен успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicForm form={form} fields={fields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави клиент' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Клиенти</h3>
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