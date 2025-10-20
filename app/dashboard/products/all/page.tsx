'use client';
import { useEffect, useMemo, useState } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createProduct, updateProduct, useProducts } from './hooks';
import { findTableFields } from '@/utils/helpers';
import { useUserRole } from '../../companies/[id]/hooks';
import SuccessMessage from '@/components/form/successMessage';
import DynamicForm from '@/components/form';
import styles from '../../dashboard-grid.module.css';
import { fields } from './const';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import { useProductCategories } from '../categories/hooks';
import { formatPrice } from '@/utils/helpers'
import { useCurrentCompany } from '../../hooks';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ProductsPage() {
  const { products: rowData, mutate } = useProducts();
  const { company } = useCurrentCompany();
  const { categories } = useProductCategories();
  const { userRole } = useUserRole();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<`ny`>();
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
      const table = findTableFields(userRole, "productsListSection", "productsListTable", 1)
 
      const modifiedColDefs = table?.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'salePrice') {
          colDef.valueFormatter = (params) => `${formatPrice(params.value, company?.currency)}`;
        }

        if (col.field === 'costPrice') {
          colDef.valueFormatter = (params) => `${formatPrice(params.value, company?.currency)}`;
        }

        if (col.field === 'vat') {
          colDef.valueFormatter = (params) => `${params.value}%`;
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
          colDef.pinned = 'right';
      }
      
        return colDef;
      });
      setColDefs(modifiedColDefs)
    }
  }, [userRole, company])

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any): Promise<any> => {  
    console.log('crb_data', data)
    try {
      if (editMode) {
        console.log('crb_currentRow', currentRow)
        await updateProduct(currentRow?._id, data);
      } else {
        await createProduct(data);
      }
      setIsModalOpen(false);
      mutate();
    } catch (e: any) {
      setBackEndError(e.message);
    }
  };

  const newFields = useMemo(() => {
    return {
      ...fields,
      categoryId: {
        ...fields.categoryId,
        options: categories?.map((user: any) => ({
          value: user._id,
          label: `${user.name}`
        })) || [] 
      },
    };
  }, [fields, categories]);

  const handleClose = () => {
    setIsModalOpen(false);
    setBackEndError('');
  }

  return (
    <div className={styles.grid}>
      {<SuccessMessage title="Успешно добавен продукт" message="Продуктът е добавен успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicForm form={form} fields={newFields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави продукт' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Видове продукти</h3>
        <button onClick={() => setIsModalOpen(true)}>Добави вид продукт</button>
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