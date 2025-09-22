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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [backEndError, setBackEndError] = useState('');
  const [currentRow, setCurrentRow] = useState<Client>();

  const form = useForm({ mode: 'all' });

  const onSubmit = async (data: any) : Promise<any> => {
    try {
      if(editMode) {
       await updateClient(currentRow?._id, data);
      } else {
        await createClient(data);
      }
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
          <button
            onClick={() => handleEdit(params)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
          >
            Редактирай
          </button>
        ),
        sortable: false,
        filter: false,
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Клиенти</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави клиент
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
      
      {isModalOpen && <DynamicForm fields={fields} form={form} onSubmit={onSubmit} backEndError={backEndError} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}