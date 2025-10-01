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
import styles from './tasks.module.css';

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
  const [currentTask, setCurrentTask] = useState<any>();
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
        if (col.field === 'actions') {
          colDef.cellRenderer = (row: any) => (
            <button
              onClick={() => {
                setIsModalOpen(true)
                setIsEditMode(true)
                setCurrentTask(row.data);
                Object.keys(fields).map((fieldName: any) => {
                  if(fieldName === 'reporter') {
                    form.setValue('reporter', row.data[fieldName]._id)
                  } else if(fieldName === 'assignee') {
                    form.setValue('assignee', row.data[fieldName]._id)
                  } else {
                    form.setValue(fieldName, row.data[fieldName]);
                  }
                })
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
            >
              Редактирай
            </button>
          );
        }

        return colDef;
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#E0F7FF' };
      }
    },
  };

  const form = useForm({ mode: 'all' });
  const onSubmit = async (data: any) : Promise<any> => {
    try {
      if(isEditMode) {
        console.log('crb_currentTask', currentTask)
        await updateTask(currentTask?._id, data);
      } else {
        await createTask(data);
      }
      
      setBackEndError('');
      setIsModalOpen(false);
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

  return (
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Tasks</h3>
      </div>
        <div className={styles.table}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            gridOptions={gridOptions} // Добавяме gridOptions за стилизиране на редове
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