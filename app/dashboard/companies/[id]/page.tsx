'use client';
import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useParams } from 'next/navigation';
import { useUsers, createUser, updateUser, useRolesByCompany, createRole, updateRole, deleteRole, useUserRole } from './hooks';
import RoleForm from '@/components/dashboard/companies/rolesForm';
import { findTableFields } from '@/utils/helpers';

ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  roleId?: string;
  country: string;
  city: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  password?: string;
  firebaseUserIds?: string | null;
  companyId: string;
}

interface Role {
  _id?: string;
  name: string;
  description?: string;
  companyId: string;
}

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const { users: userData, mutate: mutateUsers } = useUsers(id as string);
  const { roles: roleData, mutate: mutateRoles } = useRolesByCompany(id as string);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userFormData, setUserFormData] = useState<User>({
    firstName: '',
    middleName: '',
    lastName: '',
    roleId: '',
    role: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    firebaseUserIds: null,
    companyId: id as string,
  });
  const [roleFormData, setRoleFormData] = useState<Role>({
    name: '',
    description: '',
    companyId: id as string,
  });
  const [userFormErrors, setUserFormErrors] = useState({
    firstName: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    email: '',
  });
  const [roleFormErrors, setRoleFormErrors] = useState({
    name: '',
  });

  const { userRole } = useUserRole();
  const [userColDefs, setUserColDefs] = useState([]);
  const [roleColDefs, setRoleColDefs] = useState([]);

  useEffect(() => {
    if(userRole) {
      const userTable = findTableFields(userRole, "companiesSection", "usersTable")

      const roleTable = findTableFields(userRole, "companiesSection", "rolesTable")

      const modifiedUsersColDefs = userTable.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <button
              onClick={() => handleEditUser(params.data)}
              className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
            >
              Редактирай
            </button>
          );
        };
      
        return colDef;
      });

      const modifiedRolesColDefs = roleTable.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <>
              <button
                onClick={() => handleEditRole(params.data)}
                className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-1 px-2 rounded text-sm transition duration-200 mr-10"
              >
                Редактирай
              </button>

              <button
              onClick={() => handleDeleteRole(params.data)}
              className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
              >
              Изтрий
              </button>
            </>
          );
        };
      
        return colDef;
      });

      setUserColDefs(modifiedUsersColDefs)
      setRoleColDefs(modifiedRolesColDefs)
    }
  }, [userRole])
  
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const copyPassword = () => {
    if (userFormData.password) {
      navigator.clipboard.writeText(userFormData.password);
      alert('Паролата е копирана в клипборда!');
    }
  };

  const handleAddUser = () => {
    setIsEditMode(false);
    setPasswordVisible(false);
    setUserFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      roleId: '',
      role: '', 
      country: '',
      city: '',
      address: '',
      phone: '',
      email: '',
      password: generatePassword(),
      firebaseUserIds: null,
      companyId: id as string,
    });
    setUserFormErrors({ firstName: '', country: '', city: '', address: '', phone: '', email: '' });
    setUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setIsEditMode(true);
    setPasswordVisible(false);
    setUserFormData({
      ...user,
      middleName: user.middleName || '',
      lastName: user.lastName || '',
      roleId: user.roleId || '',
      phone: user.phone || '',
      password: '', // Не връщаме старата парола
    });
    setUserFormErrors({ firstName: '', country: '', city: '', address: '', phone: '', email: '' });
    setUserModalOpen(true);
  };

  const handleAddRole = () => {
    setIsEditMode(false);
    setRoleFormData({ name: '', description: '', companyId: id as string });
    setRoleFormErrors({ name: '' });
    setRoleModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setIsEditMode(true);
    setRoleFormData(role);
    setRoleFormErrors({ name: '' });
    setRoleModalOpen(true);
  };

  const handleDeleteRole = async (role: any) => {
    const confirmed = window.confirm(`Сигурни ли сте, че искате да изтриете ролята "${role.name}"?`);
    if (confirmed) {
      try {
        await deleteRole(role._id);
        mutateRoles();
      } catch (error) {
        console.error('Грешка при изтриване на роля:', error);
      }
    }
  }

  const closeUserModal = () => {
    setUserModalOpen(false);
    setUserFormErrors({ firstName: '', country: '', city: '', address: '', phone: '', email: '' });
  };

  const closeRoleModal = () => {
    setRoleModalOpen(false);
    setRoleFormErrors({ name: '' });
  };

  const handleUserInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUserFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateUserForm = () => {
    const errors = { firstName: '', country: '', city: '', address: '', phone: '', email: '' };
    let isValid = true;

    if (!userFormData.firstName.trim()) {
      errors.firstName = 'Името е задължително';
      isValid = false;
    }
    if (!userFormData.country.trim()) {
      errors.country = 'Държавата е задължителна';
      isValid = false;
    }
    if (!userFormData.city.trim()) {
      errors.city = 'Градът е задължителен';
      isValid = false;
    }
    if (!userFormData.address.trim()) {
      errors.address = 'Адресът е задължителен';
      isValid = false;
    }
    if (!userFormData.phone.trim()) {
      errors.phone = 'Телефонът е задължителен';
      isValid = false;
    }
    if (!userFormData.email.trim()) {
      errors.email = 'Имейлът е задължителен';
      isValid = false;
    }

    setUserFormErrors(errors);
    return isValid;
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUserForm()) return;

    try {
      const data = { ...userFormData };
      if (data.password === '') {
        delete data.password;
      }
      if (isEditMode) {
        await updateUser(data);
      } else {
        await createUser(data);
      }
      mutateUsers();
      closeUserModal();
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Users Table */}
        <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Потребители</h2>
            <button
              onClick={handleAddUser}
              className="bg-white text-[#0092b5] font-semibold py-2 px-4 rounded transition duration-200 hover:bg-gray-100"
            >
              Добави потребител
            </button>
          </div>
          <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
            <AgGridReact
              rowData={userData}
              columnDefs={userColDefs}
              pagination={true}
              paginationPageSize={10}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
              }}
            />
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Роли</h2>
            <button
              onClick={handleAddRole}
              className="bg-white text-[#0092b5] font-semibold py-2 px-4 rounded transition duration-200 hover:bg-gray-100"
            >
              Добави роля
            </button>
          </div>
          <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
            <AgGridReact
              rowData={roleData}
              columnDefs={roleColDefs}
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

      {/* Модал за добавяне/редактиране на потребител */}
      {userModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              {isEditMode ? 'Редактирай потребител' : 'Добави нов потребител'}
            </h2>
            <form onSubmit={handleUserSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Име</label>
                <input
                  type="text"
                  name="firstName"
                  value={userFormData.firstName}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {userFormErrors.firstName && <p className="text-red-400 text-sm mt-1">{userFormErrors.firstName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Презиме</label>
                <input
                  type="text"
                  name="middleName"
                  value={userFormData.middleName || ''}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  value={userFormData.lastName || ''}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Роля</label>
                <select
                  name="roleId"
                  value={userFormData.roleId || ''}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                >
                  <option value="">Избери роля...</option>
                  {roleData?.map((role: Role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Държава</label>
                <input
                  type="text"
                  name="country"
                  value={userFormData.country}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {userFormErrors.country && <p className="text-red-400 text-sm mt-1">{userFormErrors.country}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Град</label>
                <input
                  type="text"
                  name="city"
                  value={userFormData.city}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {userFormErrors.city && <p className="text-red-400 text-sm mt-1">{userFormErrors.city}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Адрес</label>
                <input
                  type="text"
                  name="address"
                  value={userFormData.address}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {userFormErrors.address && <p className="text-red-400 text-sm mt-1">{userFormErrors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={userFormData.phone}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {userFormErrors.phone && <p className="text-red-400 text-sm mt-1">{userFormErrors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Имейл</label>
                <input
                  type="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleUserInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {userFormErrors.email && <p className="text-red-400 text-sm mt-1">{userFormErrors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Парола</label>
                <div className="flex gap-2">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={userFormData.password || ''}
                    onChange={handleUserInputChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-2 px-4 rounded transition duration-200"
                  >
                    {passwordVisible ? 'Скрий' : 'Покажи'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserFormData((prev) => ({ ...prev, password: generatePassword() }))}
                    className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-2 px-4 rounded transition duration-200"
                  >
                    Генерирай
                  </button>
                  <button
                    type="button"
                    onClick={copyPassword}
                    className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-2 px-4 rounded transition duration-200"
                  >
                    Копирай
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeUserModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Запази
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модал за добавяне/редактиране на роля */}
      {roleModalOpen && (
  <RoleForm
    initialRole={roleFormData}
    isEditMode={isEditMode}
    onSave={async (role: any) => {
      try {
        if (isEditMode) {
          await updateRole(role._id, role);
        } else {
          await createRole(role);
        }
        mutateRoles();
        closeRoleModal();
      } catch (error) {
        console.error('Грешка при изпращане на заявката:', error);
      }
    }}
    onCancel={closeRoleModal}
  />
)}
    </div>
  );
}