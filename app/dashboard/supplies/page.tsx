'use client';
import { useState } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useProducts } from '../products/all/hooks';
import { useSuppliers } from '../suppliers/hooks';
import { useSupplies, createSupply } from './hooks';
import { useLocations } from '../locations/hooks';

// Регистриране на модули
ModuleRegistry.registerModules([AllCommunityModule]);

interface Supplier {
  _id: string;
  companyName: string;
  responsiblePerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Location {
  _id: string;
  name: string;
  type: 'warehouse' | 'store' | 'bin';
}

interface SupplyProduct {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  lotNumber: string;
  expiryDate?: string;
  serialNumber?: string;
  isIndividual: boolean;
}

interface Supply {
  _id: string;
  supplierId: string;
  companyName: string;
  products: SupplyProduct[];
  totalPrice: number;
  price: number;
  status: string;
  deliveryDate: string;
  currency: 'EUR' | 'BGN';
  updatedAt: string;
}

// Функция за форматиране на цена с избрана валута
const formatPrice = (price: number, currency: 'EUR' | 'BGN') => {
  return price.toLocaleString('bg-BG', { style: 'currency', currency });
};

export default function SuppliesPage() {
  const { suppliers } = useSuppliers();
  const { products } = useProducts();
  const { locations } = useLocations();
  const { supplies: rowData, mutate } = useSupplies();
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);

  // Дефиниция на колони за главната таблица
  const [colDefs] = useState<ColDef<Supply>[]>([
    {
      field: 'companyName',
      headerName: 'Доставчик',
      filter: true,
    },
    {
      field: 'price',
      headerName: 'Цена на доставка',
      filter: true,
      valueFormatter: (params) => formatPrice(params.data.price, params.data.currency),
    },
    {
      field: 'status',
      headerName: 'Статус',
      filter: true,
      valueFormatter: (params) => {
        const statusMap: Record<string, string> = {
          pending: 'Очакваща',
          received: 'Получена',
          canceled: 'Отменена',
        };
        return statusMap[params.value] || params.value;
      },
    },
    {
      field: 'deliveryDate',
      headerName: 'Дата на доставка',
      filter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleString('bg-BG'),
    },
    {
      headerName: 'Действия',
      cellRenderer: (params: any) => (
        <button
          onClick={() => setSelectedSupply(params.data)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
        >
          Детайли
        </button>
      ),
      width: 120,
    },
  ]);

  // Състояние за модала за добавяне
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierId: '',
    locationId: '',
    products: [] as SupplyProduct[],
    status: 'pending',
    deliveryDate: new Date().toISOString().split('T')[0],
    price: 0,
    currency: 'EUR' as 'EUR' | 'BGN',
  });
  const [formErrors, setFormErrors] = useState({
    supplierId: '',
    locationId: '',
    products: '',
    status: '',
    deliveryDate: '',
    price: '',
    currency: '',
  });

  const handleAddSupply = () => {
    setIsModalOpen(true);
    setFormData({
      supplierId: '',
      locationId: '',
      products: [],
      status: 'pending',
      deliveryDate: new Date().toISOString().split('T')[0],
      price: 0,
      currency: 'EUR',
    });
    setFormErrors({
      supplierId: '',
      locationId: '',
      products: '',
      status: '',
      deliveryDate: '',
      price: '',
      currency: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      supplierId: '',
      locationId: '',
      products: [],
      status: 'pending',
      deliveryDate: new Date().toISOString().split('T')[0],
      price: 0,
      currency: 'EUR',
    });
    setFormErrors({
      supplierId: '',
      locationId: '',
      products: '',
      status: '',
      deliveryDate: '',
      price: '',
      currency: '',
    });
  };

  const closeDetailPopup = () => {
    setSelectedSupply(null);
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { productId: '', quantity: 1, productName: '', productPrice: 0, lotNumber: '', expiryDate: '', serialNumber: '', isIndividual: false },
      ],
    }));
  };

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleProductChange = (index: number, field: keyof SupplyProduct, value: string | number | boolean) => {
    const updatedProducts = formData.products.map((p, i) => {
      if (i === index) {
        if (field === 'productId') {
          const product = products.find((prod) => prod._id === value);
          return {
            ...p,
            productId: value as string,
            productName: product ? product.name : '',
            productPrice: product ? product.price : 0,
          };
        }
        if (field === 'isIndividual') {
          return {
            ...p,
            isIndividual: value as boolean,
            quantity: value ? 1 : p.quantity,
            serialNumber: value ? p.serialNumber : '',
          };
        }
        return { ...p, [field]: value };
      }
      return p;
    });
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
    setFormErrors((prev) => ({ ...prev, products: '' }));
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = { supplierId: '', locationId: '', products: '', status: '', deliveryDate: '', price: '', currency: '' };
    let isValid = true;

    if (!formData.supplierId) {
      errors.supplierId = 'Изборът на доставчик е задължителен';
      isValid = false;
    }

    if (!formData.locationId) {
      errors.locationId = 'Изборът на локация е задължителен';
      isValid = false;
    }

    if (formData.products.length === 0) {
      errors.products = 'Добавете поне един продукт';
      isValid = false;
    } else {
      for (const p of formData.products) {
        if (!p.productId) {
          errors.products = 'Изберете продукт за всеки ред';
          isValid = false;
        }
        if (p.quantity <= 0 || isNaN(p.quantity)) {
          errors.products = 'Въведете валидно количество за всеки продукт';
          isValid = false;
        }
        if (p.isIndividual && !p.serialNumber?.trim()) {
          errors.products = 'Серийният номер е задължителен за индивидуални продукти';
          isValid = false;
        }
      }
    }

    if (!formData.status) {
      errors.status = 'Изборът на статус е задължителен';
      isValid = false;
    }

    if (!formData.deliveryDate) {
      errors.deliveryDate = 'Датата на доставка е задължителна';
      isValid = false;
    }

    if (formData.price < 0 || isNaN(formData.price)) {
      errors.price = 'Цената на доставка не може да е отрицателна';
      isValid = false;
    }

    if (!formData.currency) {
      errors.currency = 'Изборът на валута е задължителен';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const totalPrice = formData.products.reduce((sum, p) => {
        const product = products.find((prod) => prod._id === p.productId);
        return sum + (product ? product.price * p.quantity : 0);
      }, 0);

      const supplyData = {
        supplierId: formData.supplierId,
        locationId: formData.locationId,
        products: formData.products.map((p) => ({
          productId: p.productId,
          quantity: p.quantity,
          lotNumber: p.lotNumber,
          expiryDate: p.expiryDate,
          serialNumber: p.isIndividual ? p.serialNumber : undefined,
        })),
        totalPrice,
        price: formData.price,
        status: formData.status,
        deliveryDate: formData.deliveryDate,
        currency: formData.currency,
      };

      await createSupply(supplyData);
      mutate();
      closeModal();
    } catch (error) {
      console.error('Грешка при изпращане на заявката:', error);
    }
  };

  const detailColDefs: ColDef<SupplyProduct>[] = [
    { field: 'productName', headerName: 'Продукт', filter: true },
    { field: 'quantity', headerName: 'Количество', filter: true },
    { field: 'lotNumber', headerName: 'Партиден номер', filter: true },
    { field: 'serialNumber', headerName: 'Сериен номер', filter: true },
    {
      field: 'productPrice',
      headerName: 'Цена',
      filter: true,
      valueFormatter: (params) => formatPrice(params.value, selectedSupply?.currency || 'EUR'),
    },
  ];

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Доставки</h2>
          <button
            onClick={handleAddSupply}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави доставка
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
          />
        </div>
      </div>

      {/* Модал за добавяне на доставка */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">Добави нова доставка</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Доставчик</label>
                <select
                  value={formData.supplierId}
                  onChange={(e) => handleFieldChange('supplierId', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери доставчик...</option>
                  {suppliers?.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.companyName}
                    </option>
                  ))}
                </select>
                {formErrors.supplierId && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.supplierId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Локация</label>
                <select
                  value={formData.locationId}
                  onChange={(e) => handleFieldChange('locationId', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери локация...</option>
                  {locations?.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name} ({location.type})
                    </option>
                  ))}
                </select>
                {formErrors.locationId && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.locationId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">Продукти</label>
                {formData.products.map((prod, index) => (
                  <div key={index} className="flex flex-col mb-4 p-4 bg-gray-800 rounded-md">
                    <div className="flex items-center mb-2">
                      <select
                        value={prod.productId}
                        onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                        className="flex-1 mr-2 border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                      >
                        <option value="">Избери продукт...</option>
                        {products?.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded transition duration-200"
                      >
                        X
                      </button>
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-white">
                        <input
                          type="checkbox"
                          checked={prod.isIndividual}
                          onChange={(e) => handleProductChange(index, 'isIndividual', e.target.checked)}
                          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 rounded"
                        />
                        Индивидуален продукт
                      </label>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-white">Партиден номер</label>
                      <input
                        type="text"
                        value={prod.lotNumber}
                        onChange={(e) => handleProductChange(index, 'lotNumber', e.target.value)}
                        className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-white">Количество</label>
                      <input
                        type="number"
                        value={prod.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                        disabled={prod.isIndividual}
                        className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50 disabled:opacity-50"
                        min="1"
                      />
                    </div>
                    {prod.isIndividual && (
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-white">Сериен номер</label>
                        <input
                          type="text"
                          value={prod.serialNumber}
                          onChange={(e) => handleProductChange(index, 'serialNumber', e.target.value)}
                          className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                        />
                      </div>
                    )}
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-white">Срок на годност</label>
                      <input
                        type="date"
                        value={prod.expiryDate}
                        onChange={(e) => handleProductChange(index, 'expiryDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProduct}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-200 mt-2"
                >
                  Добави продукт
                </button>
                {formErrors.products && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.products}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Дата на доставка</label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleFieldChange('deliveryDate', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.deliveryDate && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.deliveryDate}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Цена на доставка</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFieldChange('price', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  min="0"
                  step="0.01"
                />
                {formErrors.price && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Валута</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleFieldChange('currency', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери валута...</option>
                  <option value="EUR">Евро</option>
                  <option value="BGN">Лев</option>
                </select>
                {formErrors.currency && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.currency}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Статус</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери статус...</option>
                  <option value="pending">Очакваща</option>
                  <option value="received">Получена</option>
                  <option value="canceled">Отменена</option>
                </select>
                {formErrors.status && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.status}</p>
                )}
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

      {/* Попъп за детайли на доставката */}
      {selectedSupply && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">Детайли за доставка</h2>
            <div className="mb-4 text-white">
              <p><strong>Доставчик:</strong> {selectedSupply.companyName}</p>
              <p><strong>Обща цена:</strong> {formatPrice(selectedSupply.totalPrice, selectedSupply.currency)}</p>
              <p><strong>Цена на доставка:</strong> {formatPrice(selectedSupply.price, selectedSupply.currency)}</p>
              <p><strong>Статус:</strong> {statusOptions.find((opt) => opt.value === selectedSupply.status)?.label || selectedSupply.status}</p>
              <p><strong>Дата на доставка:</strong> {new Date(selectedSupply.deliveryDate).toLocaleString('bg-BG')}</p>
            </div>
            <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
              <AgGridReact
                rowData={selectedSupply.products}
                columnDefs={detailColDefs}
                domLayout="autoHeight"
                defaultColDef={{
                  flex: 1,
                  minWidth: 100,
                }}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDetailPopup}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Затвори
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}