'use client';
import { useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Alpine theme CSS
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createProduct, updateProduct, useProducts } from './hooks';

// Register all Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: string;
  sku?: string;
  serialNumber?: string;
  expiryDate?: string;
  productType: 'serialized' | 'bulk';
}

export default function ProductsPage() {
  const { products: rowData, mutate } = useProducts();

  const [colDefs] = useState<ColDef<Product>[]>([
    { field: 'name', headerName: 'Име', filter: true },
    { field: 'description', headerName: 'Описание', filter: true },
    { field: 'price', headerName: 'Цена', filter: true, valueFormatter: (params) => `${params.value} лв.` },
    { field: 'quantity', headerName: 'Наличност', filter: true, editable: (params) => params.data.productType === 'bulk' },
    { field: 'category', headerName: 'Категория', filter: true },
    { field: 'sku', headerName: 'SKU', filter: true },
    { field: 'serialNumber', headerName: 'Сериен номер', filter: true },
    { field: 'expiryDate', headerName: 'Срок на годност', filter: true },
    { field: 'productType', headerName: 'Вид продукт', filter: true },
    {
      headerName: 'Действия',
      width: 150,
      cellRenderer: (params: any) => (
        <button
          onClick={() => handleEditProduct(params.data)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
        >
          Редактирай
        </button>
      ),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'serialized' | 'bulk'>('serialized');
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    sku: '',
    serialNumber: '',
    expiryDate: '',
    productType: 'serialized',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    price: '',
    quantity: '',
    sku: '',
    serialNumber: '',
  });

  const handleAddProduct = () => {
    setIsEditMode(false);
    setActiveTab('serialized');
    setFormData({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      sku: '',
      serialNumber: '',
      expiryDate: '',
      productType: 'serialized',
    });
    setFormErrors({ name: '', price: '', quantity: '', sku: '', serialNumber: '' });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditMode(true);
    setActiveTab(product.productType);
    setFormData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ name: '', price: '', quantity: '', sku: '', serialNumber: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = { name: '', price: '', quantity: '', sku: '', serialNumber: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Името е задължително';
      isValid = false;
    }

    if (formData.price <= 0) {
      errors.price = 'Цената трябва да е по-голяма от 0';
      isValid = false;
    }

    if (activeTab === 'bulk' && formData.quantity < 0) {
      errors.quantity = 'Наличността не може да е отрицателна';
      isValid = false;
    }

    if (activeTab === 'serialized' && !formData.sku?.trim()) {
      errors.sku = 'SKU е задължителен за индивидуални продукти';
      isValid = false;
    }

    if (activeTab === 'serialized' && !formData.serialNumber?.trim()) {
      errors.serialNumber = 'Серийният номер е задължителен за индивидуални продукти';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSubmit = { ...formData, productType: activeTab };
      if (isEditMode) {
        await updateProduct(dataToSubmit);
      } else {
        await createProduct(dataToSubmit);
      }
      mutate();
      closeModal();
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  const handleCellValueChanged = async (event: any) => {
    try {
      await updateProduct(event.data);
      mutate();
    } catch (error) {
      console.error('Грешка при обновяване на продукта:', error);
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
            onCellValueChanged={handleCellValueChanged}
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
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab('serialized')}
                className={`flex-1 py-2 text-sm font-medium rounded-l-md transition-colors duration-200 ${
                  activeTab === 'serialized' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Индивидуален продукт
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`flex-1 py-2 text-sm font-medium rounded-r-md transition-colors duration-200 ${
                  activeTab === 'bulk' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Партиден продукт
              </button>
            </div>
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
              {activeTab === 'bulk' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Наличност</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  />
                  {formErrors.quantity && <p className="text-red-400 text-sm mt-1">{formErrors.quantity}</p>}
                </div>
              )}
              {activeTab === 'serialized' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white">SKU</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                    />
                    {formErrors.sku && <p className="text-red-400 text-sm mt-1">{formErrors.sku}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Сериен номер</label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                    />
                    {formErrors.serialNumber && <p className="text-red-400 text-sm mt-1">{formErrors.serialNumber}</p>}
                  </div>
                </>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Срок на годност</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
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