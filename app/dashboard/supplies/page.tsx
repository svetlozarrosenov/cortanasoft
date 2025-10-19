'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useProducts } from '../products/all/hooks';
import { useSuppliers } from '../suppliers/hooks';
import { useSupplies, createSupply, useCurrency, updateSupply } from './hooks';
import { useLocations } from '../locations/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css';
import SuccessMessage from '@/components/form/successMessage';
import DynamicForm from '@/components/form';
import { FaEdit, FaTrash } from 'react-icons/fa';
import classNames from 'classnames';
import { fields } from './const';
import { useForm } from 'react-hook-form';
import { useProductCategories } from '../products/categories/hooks';
import { useCurrentCompany } from '../hooks';

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

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Location {
  _id: string;
  name: string;
  type: 'warehouse' | 'store' | 'bin';
}

interface SupplyProduct {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  lotNumber: string;
  expiryDate?: string;
  serialNumber?: string;
  isIndividual: boolean;
}

interface Supply {
  _id: string;
  supplierId: string;
  companyName: string;
  products: SupplyProduct[];
  totalPrice: number;
  price: number;
  status: string;
  deliveryDate: string;
  currency: string;
  updatedAt: string;
}

export default function SuppliesPage() {
  const { company } = useCurrentCompany();
  const { currency } = useCurrency();
  const { suppliers } = useSuppliers();
  const { categories } = useProductCategories();
  const { products } = useProducts();
  const { locations } = useLocations();
  const { supplies: rowData, mutate } = useSupplies();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Location>();
  const [backEndError, setBackEndError] = useState('');
  const [visible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({ mode: 'all' });

  const newFields: any = {
    ...fields,
    supplierId: {
      ...fields.supplierId,
      options: suppliers?.map((supplier: any) => {
        return {value: supplier._id, label: supplier.companyName}
      })
    },
    locationId: {
      ...fields.locationId,
      options: locations?.map((location: any) => {
        return {value: location._id, label: location.name}
      })
    },
    products: {
      ...fields.products,
      filterOptions: categories?.map((product: any) => ({
        value: product._id,
        label: product.name
      })) || [],
      dataOptions: products?.map((product: any) => ({
        ...product,
        value: product._id,
        label: product.name,
      })) || []
    },
    currencyId: {
      ...fields.currencyId,
      options: currency?.map((cur: any) => {return {value: cur._id, label: `${cur.code}, ${cur.country}`}})
    }
  }

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, "suppliesSection", "suppliesTable")

      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };
        
        if (col.field === 'status') {
          colDef.valueFormatter = (params) => {
            const statusMap: Record<string, string> = {
              pending: 'Очакваща',
              received: 'Получена',
              canceled: 'Отменена',
            };
            return statusMap[params.value] || params.value;
          };
        }

        if (col.field === 'deliveryDate') {
          colDef.valueFormatter = (params) => new Date(params.value).toLocaleString('bg-BG');
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

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  const onSubmit = async (data: any) : Promise<any> => {  
    const cleanedProducts = data.products.map(({ id, ...rest }: any) => rest);
    const cleanedData = { ...data, products: cleanedProducts };
    console.log('crb_data', data)
    console.log('crb_currentRow', currentRow)
    try {
      if(editMode) {
       await updateSupply(currentRow?._id, cleanedData);
      } else {
        await createSupply(cleanedData);
      }
      setIsVisible(true);
      setIsModalOpen(false);
      mutate();
    } catch(e: any) {
      setBackEndError(e?.response?.data?.message);
    }
  }

  const handleEdit = (row: any) => {
    console.log('crb_we_are_editing')
    Object.keys(fields).map((fieldName: any) => {      
      let value = row.data[fieldName];
      
      if (fieldName === 'deliveryDate' && value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const formattedDate = date.toISOString().slice(0, 16);
          value = formattedDate;
        } else {
          value = '';
        }
      }
      
      form.setValue(fieldName, value);
    });
    
    setCurrentRow(row.data);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setBackEndError('');
  }

  return (
    <div className={styles.grid}>
      {<SuccessMessage title="Успешно добавена доставка" message="Доставката е добавен успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicForm form={form} fields={newFields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави доставка' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Доставки</h3>
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