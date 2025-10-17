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
import SuccessMessage from '@/components/form/successMessage';
import DynamicForm from '@/components/form';
import { fields } from './const';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash } from 'react-icons/fa';
import classNames from 'classnames';

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
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Location>();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any) : Promise<any> => {
    try {
      if(editMode) {
       await updateLocation(currentRow?._id, data);
      } else {
        await createLocation(data);
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
      await deleteLocation(orderId);
      mutate();
    }
  };

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'locationsSection', 'locationsTable') || [];

      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'type') {
          colDef.valueFormatter = (params) => {
            const typeMap: Record<string, string> = {
              warehouse: 'Склад',
              shop: 'Магазин',
              bin: 'Позиция',
            };
            return typeMap[params.value] || params.value;
          };
        }
        
      
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
      {<SuccessMessage title="Успешно добавена локация" message="Локацията е добавена успешно" visible={visible} setIsVisible={setIsVisible} />}
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