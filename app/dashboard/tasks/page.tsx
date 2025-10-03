'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Link from 'next/link';
import { useTasks, createTask, updateTask } from './hooks';
import { useCompanyUsers } from '../companies/[id]/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import DynamicForm from '@/components/form';
import { fields } from './const';
import { useForm } from 'react-hook-form';
import styles from '../dashboard-grid.module.css';
import SuccessMessage from '@/components/form/successMessage';

ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Task {
  _id?: string;
  title: string;
  description?: string;
  deadline?: string;
  isRecurring: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
  status: 'pending' | 'in_progress' | 'completed';
  reporter: string;
  assignee: string;
}

export default function TasksPage() {
  const { tasks: rowData, mutate } = useTasks();
  const { userRole } = useUserRole();
  const { users } = useCompanyUsers();
  const [backEndError, setBackEndError] = useState('');
  const [successMessage, setSuccessMessage] = useState<any>();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setIsVisible] = useState(false);


  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'tasksSection', 'tasksTable') || [];

      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'title') {
          colDef.valueFormatter = (params) => `Задача: ${params.value || '-'}`;
          colDef.cellRenderer = (params: any) => (
            <Link
              href={`/dashboard/tasks/${params.data._id}`}
              className="text-cyan-500 hover:underline"
            >
              {params.value}
            </Link>
          );
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
            const statusMap: Record<string, string> = {
              pending: 'Чакаща',
              in_progress: 'В процес',
              completed: 'Завършена',
            };
            return statusMap[params.value] || params.value;
          };
        }
        if (col.field === 'deadline') {
          colDef.valueFormatter = (params) =>
            params.value ? new Date(params.value).toLocaleDateString('bg-BG') : '-';
        }

        return colDef;
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  const form = useForm({ mode: 'all' });
  const onSubmit = async (data: any) : Promise<any> => {
    try {
      await createTask(data);  
      setBackEndError('');
      setIsModalOpen(false);
      setIsVisible(true);
      mutate();
    } catch(e: any) {
      setBackEndError(e.message);
    }
  }

  const newFields: any = {
    ...fields,
    reporter: {
      ...fields.reporter,
      options: users?.map((user: any) => {
        return {value: user._id, label: user.firstName + ' ' + user.lastName}
      })
    },
    assignee: {
      ...fields.assignee,
      options: users?.map((user: any) => {
        return {value: user._id, label: user.firstName + ' ' + user.lastName}
      })
    }
  }

  const watchIsRecurring = form.watch('isRecurring')

  if(!watchIsRecurring) {
    delete newFields.recurrenceInterval
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setBackEndError('');
  }

  return (
    <div className={styles.grid}>
        {<SuccessMessage title="Успешно добавяне на задача" message="задачата е добавена успешно" visible={visible} setIsVisible={setIsVisible} />}
        {isModalOpen && <DynamicForm form={form} fields={newFields} onSubmit={onSubmit} backEndError={backEndError} onClose={() => handleClose()} title='Добави задача' />}
        
        <div className={styles.head}>
          <h3 className={styles.title}>Задачи</h3>
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