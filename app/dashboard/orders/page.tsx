'use client';
import { useEffect, useMemo, useState } from 'react';
import './orders.module.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useClients } from '../clients/hooks';
import { useProducts } from '../products/all/hooks';
import { useOrders, createOrder, updateOrder } from './hooks';
import { useAvailableLots } from '../products/lots/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import Link from 'next/link';
import styles from '../dashboard-grid.module.css';
import DynamicFormFullWidth from '@/components/DynamicFormFullWidth';
import SuccessMessage from '@/components/form/successMessage';
import { useForm } from 'react-hook-form';
import { fields } from './const';
import { useCurrentCompany } from '../hooks';
import { formatPrice } from '@/utils/helpers'
import { useCurrency } from '../supplies/hooks';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Lot {
  _id: string;
  lotNumber: string;
  quantity: number;
  expiryDate?: string;
}

interface OrderProduct {
  lotId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  lotNumber: string;
  expiryDate?: string;
}

const statusOptions = [
  { value: 'pending', label: 'В обработка' },
  { value: 'shipped', label: 'Изпратена' },
  { value: 'delivered', label: 'Доставена' },
  { value: 'canceled', label: 'Отменена' },
];

export default function OrdersPage() {
  const { clients } = useClients();
  const { company } = useCurrentCompany();
  const { currency } = useCurrency();
  const { lots } = useAvailableLots();
  const { orders: rowData, mutate } = useOrders();
  const { userRole } = useUserRole();
  const [backEndError, setBackEndError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRow, setCurrentRow] = useState<Client>();


  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'ordersSection', 'ordersTable');

      const modifiedColDefs = [
        {
          field: '_id',
          headerName: 'ID на поръчка',
          flex: 1,
          cellRenderer: (params: any) => (
            <Link
              href={`/dashboard/orders/${params.data._id}`}
              className="text-cyan-500 hover:text-cyan-600 underline"
            >
              {params.value}
            </Link>
          ),
        },
        ...table.map((col: any) => {
          const colDef: ColDef = {
            field: col.field || col.headerName,
            headerName: col.headerName,
            filter: col.filter || false,
            flex: col.flex || 1,
          };

          if (col.field === 'totalPrice') {
            colDef.valueFormatter = (params) => `${formatPrice(params.value, company?.currency)}`;
          }

          if (col.field === 'recurrenceInterval') {
            colDef.valueFormatter = (params) => {
              const intervalMap: Record<string, string> = {
                daily: 'Дневно',
                weekly: 'Седмично',
                monthly: 'Месечно',
              };
              return params.value ? intervalMap[params.value] || params.value : '-';
            };
          }
          if (col.field === 'status') {
            colDef.valueFormatter = (params) => {
              const status = statusOptions.find((opt) => opt.value === params.value);
              return status ? status.label : params.value;
            };
          }
          if (col.field === 'createdAt') {
            colDef.valueFormatter = (params) => new Date(params.value).toLocaleString('bg-BG');
            colDef.sort = 'desc';
          }

          return colDef;
        }),
      ];
      setColDefs(modifiedColDefs);
    }
  }, [userRole, company]);

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any): Promise<any> => {  
    const cleanedLots = data.lots.map(({ id, ...rest }: any) => rest);
    const cleanedData = { ...data, lots: cleanedLots }; 
  
    try {
      if (editMode) {
        await updateOrder(cleanedData);
      } else {
        await createOrder(cleanedData);
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
      clientId: {
        ...fields.clientId,
        options: clients?.map((user: any) => ({
          value: user._id,
          label: `${user.firstName} ${user.lastName}`
        })) || [] 
      },
      lots: {
        ...fields.lots,
        currencyOptions: currency?.map((cur: any) => ({ value: cur._id, label: `${cur.code}, ${cur.country}`, code: cur.code })) || [],
        company: company,
        dataOptions: lots?.map((lot: any) => ({
          ...lot,
          value: lot._id,
          label: `${lot.name} ${lot.model}, наличност: ${lot.quantity}`,
        })) || []
      }
    };
  }, [fields, clients, lots, lots]);

  const handleClose = () => {
    setIsModalOpen(false);
    setBackEndError('');
  }

  return (
    <div className={styles.grid}>
      {<SuccessMessage title="Успешно добавена поръчка" message="Поръчката е добавена успешно" visible={visible} setIsVisible={setIsVisible} />}
      {isModalOpen && <DynamicFormFullWidth form={form} fields={newFields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави поръчка' />}

      <div className={styles.head}>
        <h3 className={styles.title}>Поръчки</h3>
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