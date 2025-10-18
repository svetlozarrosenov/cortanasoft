'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useInvoices } from './hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import Link from 'next/link';
import styles from '../dashboard-grid.module.css';
import { useOrders } from '../orders/hooks';
import { FaFilePdf } from 'react-icons/fa';

ModuleRegistry.registerModules([AllCommunityModule]);

interface OrderProduct {
  productId: string;
  lotId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  lotNumber: string;
  expiryDate?: string;
}

interface Order {
  _id: string;
  clientId: string;
  clientName: string;
  products: OrderProduct[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function InvoicesPage() {
  const { orders: rowData, mutate } = useOrders();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  const handlePdf = () => {
    console.log('crb_show_pdf')
  }
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
          if (col.field === 'createdAt') {
            colDef.valueFormatter = (params) => new Date(params.value).toLocaleString('bg-BG');
            colDef.sort = 'desc';
          }

          if (col.field === 'actions') {
              colDef.cellRenderer = (params: any) => (
                <div className={styles.actions}>
                  <FaFilePdf className={styles.icon} onClick={() => handlePdf(params)} />
                </div>
              );
              colDef.sortable = false;
              colDef.filter = false;
              colDef.width = 150;
              colDef.pinned = 'right';
          }

          return colDef;
        }),
      ];
      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  return (
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Фактури</h3>
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