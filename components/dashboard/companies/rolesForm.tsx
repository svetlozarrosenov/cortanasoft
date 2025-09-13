'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRolesPermissions } from '@/app/dashboard/companies/[id]/hooks';

interface Role {
  _id?: string;
  name: string;
  description?: string;
  companyId: string;
  selectedSections?: string[];
  visibleColumns?: Record<string, string[]>;
}

interface TableField {
  field?: string;
  headerName: string;
  [key: string]: any;
}

interface Table {
  id: string;
  fields: TableField[];
}

interface Section {
  sectionId: string;
  title: string;
  url: string;
  tables: Table[];
  apis: string[];
}

interface BackendRoleData {
  _id?: string | undefined;
  name: string;
  description?: string;
  companyId: string;
  permissions: Section[];
}

export default function RoleForm({ initialRole, isEditMode = false, onSave, onCancel }: any) {
  const { id } = useParams();
  const { rolesPermissions } = useRolesPermissions();
  const [formStep, setFormStep] = useState(1);

  // Инициализация на roleData с преобразуване на permissions
  const [roleData, setRoleData] = useState<Role>(() => {
    // Извличане на selectedSections и visibleColumns от initialRole.permissions
    const selectedSections: string[] = initialRole?.permissions?.map((section: Section) => section.sectionId) || [];
    const visibleColumns: Record<string, string[]> = {};

    // Попълване на visibleColumns от permissions.tables
    initialRole?.permissions?.forEach((section: Section) => {
      section.tables.forEach((table: Table) => {
        visibleColumns[table.id] = table.fields.map((field: TableField) => field.field || field.headerName);
      });
    });

    return {
      _id: initialRole?._id || '',
      name: initialRole?.name || '',
      description: initialRole?.description || '',
      companyId: id as string,
      selectedSections: selectedSections.length ? selectedSections : initialRole?.selectedSections || [],
      visibleColumns: Object.keys(visibleColumns).length ? visibleColumns : initialRole?.visibleColumns || {},
    };
  });

  const [formErrors, setFormErrors] = useState<{ name: string }>({ name: '' });
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(() => {
    const initialOpenSections: { [key: string]: boolean } = {};
    roleData.selectedSections?.forEach((sectionId) => {
      initialOpenSections[sectionId] = true;
    });
    return initialOpenSections;
  });

  // Синхронизиране на openSections при промяна на selectedSections
  useEffect(() => {
    setOpenSections((prev) => {
      const newOpenSections = { ...prev };
      roleData.selectedSections?.forEach((sectionId) => {
        newOpenSections[sectionId] = true;
      });
      return newOpenSections;
    });
  }, [roleData.selectedSections]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { name: '' };
    let isValid = true;

    if (!roleData.name.trim()) {
      errors.name = 'Името на ролята е задължително';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1 && !validateForm()) return;

    if (formStep === 2) {
      // Трансформация на roleData към формат за бекенда
      const backendData: BackendRoleData = {
        name: roleData.name,
        description: roleData.description,
        companyId: roleData.companyId,
        permissions: rolesPermissions
          .filter((section) => roleData.selectedSections?.includes(section.sectionId))
          .map((section) => ({
            sectionId: section.sectionId,
            title: section.title,
            url: section.url,
            apis: section.apis,
            tables: section.tables.map((table) => ({
              id: table.id,
              fields: table.fields.filter((field) =>
                field.field
                  ? roleData.visibleColumns?.[table.id]?.includes(field.field)
                  : roleData.visibleColumns?.[table.id]?.includes(field.headerName)
              ),
            })),
          })),
      };
      if(isEditMode) {
        backendData._id = roleData._id
      }
      console.log('crb_backendData', backendData)
      onSave(backendData);
    } else {
      setFormStep(2);
    }
  };

  const handleSectionChange = (sectionId: string, isChecked: boolean) => {
    setRoleData((prev) => ({
      ...prev,
      selectedSections: isChecked
        ? [...(prev.selectedSections || []), sectionId]
        : (prev.selectedSections || []).filter((id) => id !== sectionId),
    }));
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: isChecked,
    }));
    if (!isChecked) {
      // Изчистваме visibleColumns за всички таблици в тази секция
      const section = rolesPermissions.find((s) => s.sectionId === sectionId);
      if (section) {
        const tableIds = section.tables.map((t) => t.id);
        setRoleData((prev) => {
          const newVisibleColumns = { ...prev.visibleColumns };
          tableIds.forEach((tableId) => delete newVisibleColumns[tableId]);
          return { ...prev, visibleColumns: newVisibleColumns };
        });
      }
    }
  };

  const handleColumnChange = (tableId: string, identifier: string, isChecked: boolean) => {
    setRoleData((prev) => {
      const visible = [...(prev.visibleColumns?.[tableId] || [])];
      if (isChecked) {
        if (!visible.includes(identifier)) {
          visible.push(identifier);
        }
      } else {
        const index = visible.indexOf(identifier);
        if (index > -1) {
          visible.splice(index, 1);
        }
      }
      return {
        ...prev,
        visibleColumns: {
          ...prev.visibleColumns,
          [tableId]: visible,
        },
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-white mb-4">
          {isEditMode ? 'Редактирай роля' : 'Добави нова роля'}
        </h2>
        <form onSubmit={handleSubmit}>
          {formStep === 1 ? (
            <>
              {/* Стъпка 1: Основна информация */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Име на ролята</label>
                <input
                  type="text"
                  name="name"
                  value={roleData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
                {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Описание</label>
                <textarea
                  name="description"
                  value={roleData.description || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-[#0092b5] focus:ring focus:ring-[#0092b5] focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateForm()) setFormStep(2);
                  }}
                  className="bg-[#0092b5] hover:bg-[#007a99] text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Напред
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Стъпка 2: Избор на секции и колони */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Избери секции</label>
                <div className="mt-2 space-y-2">
                  {rolesPermissions.map((section) => (
                    <div key={section.sectionId} className="border-b border-gray-600">
                      <div className="flex items-center py-2">
                        <input
                          type="checkbox"
                          id={section.sectionId}
                          checked={roleData.selectedSections?.includes(section.sectionId) || false}
                          onChange={(e) => handleSectionChange(section.sectionId, e.target.checked)}
                          className="h-4 w-4 text-[#0092b5] focus:ring-[#0092b5] border-gray-600 rounded"
                        />
                        <label
                          htmlFor={section.sectionId}
                          className="ml-2 text-sm text-white font-medium"
                        >
                          {section.title}
                        </label>
                      </div>
                      {roleData.selectedSections?.includes(section.sectionId) && (
                        <div className="pl-4 py-2 space-y-2">
                          {section.tables.map((table) => (
                            <div key={table.id}>
                              <h4 className="text-white text-sm font-medium mb-2">
                                Колони за {table.id}
                              </h4>
                              <ul className="space-y-1">
                                {table.fields.map((field) => {
                                  const identifier = field.field || field.headerName;
                                  return (
                                    <li key={identifier} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        id={`${table.id}.${identifier}`}
                                        checked={
                                          roleData.visibleColumns?.[table.id]?.includes(identifier) || false
                                        }
                                        onChange={(e) =>
                                          handleColumnChange(table.id, identifier, e.target.checked)
                                        }
                                        className="h-4 w-4 text-[#0092b5] focus:ring-[#0092b5] border-gray-600 rounded"
                                      />
                                      <label
                                        htmlFor={`${table.id}.${identifier}`}
                                        className="ml-2 text-sm text-white"
                                      >
                                        {field.headerName}
                                      </label>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setFormStep(1)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Назад
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onCancel}
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
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}