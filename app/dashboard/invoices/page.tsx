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
  const { invoices: rowData, mutate } = useInvoices();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (userRole) {
      // Предполагам, че има таблица за фактури в конфигурацията на userRole
      const table = findTableFields(userRole, 'invoicesSection', 'invoicesTable');

      const modifiedColDefs: ColDef[] = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        // Форматиране на полета
        if (col.field === 'invoiceNumber') {
          colDef.cellRenderer = (params: any) => (
            <Link
              href={`/invoices/${params.data._id}`}
              className="text-cyan-500 hover:text-cyan-600 underline"
            >
              {`FAK-${params.data._id}-${Math.floor(100000 + Math.random() * 900000)}`}
            </Link>
          );
        }
        if (col.field === 'clientName') {
          colDef.valueFormatter = (params) => params.value || '-';
        }
        if (col.field === 'totalPrice') {
          colDef.valueFormatter = (params) =>
            params.value ? params.value.toLocaleString('bg-BG', { style: 'currency', currency: 'EUR' }) : '-';
        }
        if (col.field === 'status') {
          colDef.valueFormatter = (params) => params.value || '-';
        }
        if (col.field === 'createdAt') {
          colDef.valueFormatter = (params) =>
            params.value ? new Date(params.value).toLocaleDateString('bg-BG') : '-';
        }

        return colDef;
      });

      // Добавяне на колона за действия
      modifiedColDefs.push({
        headerName: 'Действия',
        width: 150,
        pinned: 'right',
        cellRenderer: (params: any) => (
          <button
            onClick={() => router.push(`/invoices/${params.data._id}`)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
          >
            Преглед
          </button>
        ),
        sortable: false,
        filter: false,
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole, router]);

  // Стилизиране на редовете
  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  const handleAddInvoice = () => {
    // Placeholder за добавяне на нова фактура
    // Може да добавиш модал или редирект към страница за създаване на фактура
    alert('Функция за добавяне на фактура не е имплементирана още.');
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Фактури</h2>
          <button
            onClick={handleAddInvoice}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави фактура
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
          />
        </div>
      </div>
    </div>
  );
}