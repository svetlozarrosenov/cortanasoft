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

  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Task>({
    title: '',
    description: '',
    deadline: '',
    isRecurring: false,
    recurrenceInterval: 'daily',
    status: 'pending',
    reporter: '',
    assignee: '',
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    status: '',
    reporter: '',
    assignee: '',
  });

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

        // Прилагане на valueFormatter и cellRenderer за специфични колони
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
          colDef.cellRenderer = (params: any) => (
            <button
              onClick={() => handleEditTask(params.data)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
            >
              Редактирай
            </button>
          );
          colDef.sortable = false;
          colDef.filter = false;
          colDef.width = 150;
        }

        return colDef;
      });

      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

  // Добавяне на gridOptions за стилизиране на редовете
  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  const handleAddTask = () => {
    setIsEditMode(false);
    setFormData({
      title: '',
      description: '',
      deadline: '',
      isRecurring: false,
      recurrenceInterval: 'daily',
      status: 'pending',
      reporter: '',
      assignee: '',
    });
    setFormErrors({ title: '', status: '', reporter: '', assignee: '' });
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setIsEditMode(true);
    setFormData(task);
    setFormErrors({ title: '', status: '', reporter: '', assignee: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ title: '', status: '', reporter: '', assignee: '' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { title: '', status: '', reporter: '', assignee: '' };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Заглавието е задължително';
      isValid = false;
    }

    if (!formData.status) {
      errors.status = 'Статусът е задължителен';
      isValid = false;
    }

    if (!formData.reporter) {
      errors.reporter = 'Възложителят е задължителен';
      isValid = false;
    }

    if (!formData.assignee) {
      errors.assignee = 'Отговорникът е задължителен';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = {
        ...formData,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
      };
      if (isEditMode) {
        await updateTask(data);
      } else {
        await createTask(data);
      }
      mutate();
      closeModal();
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Задачи</h2>
          <button
            onClick={handleAddTask}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави задача
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
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

      {/* Модал за добавяне/редактиране на задача */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              {isEditMode ? 'Редактирай задача' : 'Добави нова задача'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Заглавие</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.title && <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Описание</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Възложител</label>
                <select
                  name="reporter"
                  value={formData.reporter}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери възложител...</option>
                  {users?.map((user: User) => {
                    console.log('crb_user_we', user)
                    return (
                    <option key={user._id} value={user._id}>
                      {user.firstName + ' ' + user.lastName + ` (${user.email})`}
                    </option>
                  )})}
                </select>
                {formErrors.reporter && <p className="text-red-400 text-sm mt-1">{formErrors.reporter}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Отговорник</label>
                <select
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери отговорник...</option>
                  {users?.map((user: User) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName + ' ' + user.lastName + ` (${user.email})`}
                    </option>
                  ))}
                </select>
                {formErrors.assignee && <p className="text-red-400 text-sm mt-1">{formErrors.assignee}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Краен срок</label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Повтарящо се</label>
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-cyan-500 focus:ring-cyan-500 bg-gray-800 border-gray-600 rounded"
                />
              </div>
              {formData.isRecurring && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Интервал на повторение</label>
                  <select
                    name="recurrenceInterval"
                    value={formData.recurrenceInterval}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  >
                    <option value="daily">Дневно</option>
                    <option value="weekly">Седмично</option>
                    <option value="monthly">Месечно</option>
                  </select>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Статус</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="pending">Чакаща</option>
                  <option value="in_progress">В процес</option>
                  <option value="completed">Завършена</option>
                </select>
                {formErrors.status && <p className="text-red-400 text-sm mt-1">{formErrors.status}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Запази
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}