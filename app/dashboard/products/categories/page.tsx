'use client';
import { useEffect, useMemo, useState } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createProductCategory, updateProductCategory, useProductCategories } from './hooks';
import { findTableFields } from '@/utils/helpers';
import { useUserRole } from '../../companies/[id]/hooks';
import SuccessMessage from '@/components/form/successMessage';
import DynamicForm from '@/components/form';
import styles from '../../dashboard-grid.module.css';
import { fields } from './const';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';

// Регистриране на модули
ModuleRegistry.registerModules([AllCommunityModule]);

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  companyId: string;
  quantity: number;
}

export default function ProductsPage() {
  const { categories: rowData, mutate } = useProductCategories();
  const categories: any = [];
  const { userRole } = useUserRole();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Product>();
  const [colDefs, setColDefs] = useState([]);

  const handleEdit = (row: any) => {
    Object.keys(fields).map((fieldName: any) => {
      form.setValue(fieldName, row.data[fieldName]);
    })
    setCurrentRow(row.data);
    setEditMode(true);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if(userRole) {
      const table = findTableFields(userRole, "productsCategoriesListSection", "productsCategoriesListTable", 1)
 
      const modifiedColDefs = table?.map((col: any) => {
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
            </div>
          );
          colDef.sortable = false;
          colDef.filter = false;
          colDef.width = 150;
          colDef.pinned = 'right';
        }
      
        return colDef;
      });
      setColDefs(modifiedColDefs)
    }
  }, [userRole])

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any): Promise<any> => {  
    try {
      if (editMode) {
        await updateProductCategory(data);
      } else {
        console.log('crb_data', data);

        await createProductCategory(data);
      }
      setIsModalOpen(false);
      mutate();
    } catch (e: any) {
      setBackEndError(e.message);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setBackEndError('');
  }

  return (
    <div className={styles.grid}>
      {<SuccessMessage title="Успешно добавена категория" message="Категорията е добавена успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicForm form={form} fields={fields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави категория' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Категории</h3>
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