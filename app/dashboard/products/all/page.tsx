'use client';
import { useEffect, useState } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createProduct, updateProduct, useProducts } from './hooks';
import { findTableFields } from '@/utils/helpers';
import { useUserRole } from '../../companies/[id]/hooks';

// Регистриране на модули
ModuleRegistry.registerModules([AllCommunityModule]);

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  companyId: string;
  quantity: number;
}

export default function ProductsPage() {
  const { products: rowData, mutate } = useProducts();

  const { userRole } = useUserRole();

  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    if(userRole) {
      const table = findTableFields(userRole, "productsListSection", "productsListTable", 1)
 
      const modifiedColDefs = table?.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'price') {
          colDef.valueFormatter = (params) => `${params.value} лв.`;
        }

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <button
              onClick={() => handleEditProduct(params.data)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
            >
              Редактирай
            </button>
          );
        };
      
        return colDef;
      });
      setColDefs(modifiedColDefs)
    }
  }, [userRole])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    category: '',
    companyId: '',
    quantity: 0,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const handleAddProduct = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      companyId: '',
      quantity: 0,
    });
    setFormErrors({ name: '', price: '', category: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditMode(true);
    setFormData(product);
    setFormErrors({ name: '', price: '', category: '', description: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ name: '', price: '', category: '', description: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { name: '', price: '', category: '', description: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Името е задължително';
      isValid = false;
    }

    if (formData.price <= 0) {
      errors.price = 'Цената трябва да е по-голяма от 0';
      isValid = false;
    }

    if (!formData.category.trim()) {
      errors.category = 'Категорията е задължителна';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'Описанието е задължително';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
      };
      if (isEditMode) {
        await updateProduct(formData._id!, dataToSubmit);
      } else {
        await createProduct(dataToSubmit);
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
          <h2 className="text-lg font-semibold text-white">Продукти</h2>
          <button
            onClick={handleAddProduct}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави продукт
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">
              {isEditMode ? 'Редактирай продукт' : 'Добави нов продукт'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Име</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Описание</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.description && <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Цена</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.price && <p className="text-red-400 text-sm mt-1">{formErrors.price}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Категория</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.category && <p className="text-red-400 text-sm mt-1">{formErrors.category}</p>}
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