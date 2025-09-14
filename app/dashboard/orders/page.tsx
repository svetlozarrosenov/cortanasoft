  'use client';
  import { useEffect, useState } from 'react';
  import './orders.module.css'
  // import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { ColDef } from 'ag-grid-community';
  import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
  import { AgGridReact } from 'ag-grid-react';
  import { useClients } from '../clients/hooks';
  import { useProducts } from '../products/all/hooks';
  import { useOrders, createOrder } from './hooks';
  import { useAvailableLots } from '../products/lots/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import Link from 'next/link';

  // Регистриране на модули
  ModuleRegistry.registerModules([AllCommunityModule]);

  interface Client {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
  }

  interface Product {
    _id: string;
    name: string;
    price: number;
  }

  interface Lot {
    _id: string;
    lotNumber: string;
    quantity: number;
    expiryDate?: string;
  }

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

  // Функция за форматиране на цена в евро
  const formatPrice = (price: number) => {
    return price.toLocaleString('bg-BG', { style: 'currency', currency: 'EUR' });
  };

  // Опции за статус на поръчката
  const statusOptions = [
    { value: 'pending', label: 'В обработка' },
    { value: 'shipped', label: 'Изпратена' },
    { value: 'delivered', label: 'Доставена' },
    { value: 'canceled', label: 'Отменена' },
  ];

  export default function OrdersPage() {
    const { clients } = useClients();
    const { products } = useProducts();
    const { lots } = useAvailableLots();
    const { orders: rowData, mutate } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Състояние за модала за добавяне
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      clientId: '',
      products: [] as OrderProduct[],
      status: 'pending' as string,
    });
    const [formErrors, setFormErrors] = useState({
      clientId: '',
      products: '',
      status: '',
    });

  const { userRole } = useUserRole();

  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    if(userRole) {
      const table = findTableFields(userRole, "ordersSection", "ordersTable")
 
      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        // Прилагане на valueFormatter за специфични колони
        if (col.field === 'totalPrice') {
          colDef.valueFormatter = (params) => formatPrice(params.value);
        }
          
        if (col.field === 'recurrenceInterval') {
          colDef.valueFormatter = (params) => {
                  const intervalMap: Record<string, string> = {
                    daily: 'Дневно',
                    weekly: 'Седмично',
                    monthly: 'Месечно',
                  };
                  return params.value ? intervalMap[params.value] || params.value : '-';
                };};
        if(col.field === 'status') {
          colDef.valueFormatter = (params) => {
            const status = statusOptions.find((opt) => opt.value === params.value);
            return status ? status.label : params.value;
          };
              
        }
        if (col.field === 'createdAt') {
          colDef.valueFormatter = (params) => new Date(params.value).toLocaleString('bg-BG');
        }

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <button
              onClick={() => setSelectedOrder(params.data)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-2 rounded text-sm transition duration-200"
            >
              Детайли
            </button>
          );
        };
      
        return colDef;
      });
      setColDefs(modifiedColDefs)
    }
  }, [userRole])


    // Функция за отваряне на модала за добавяне
    const handleAddOrder = () => {
      setIsModalOpen(true);
      setFormData({ clientId: '', products: [], status: 'pending' });
      setFormErrors({ clientId: '', products: '', status: '' });
    };

    // Функция за затваряне на модала за добавяне
    const closeModal = () => {
      setIsModalOpen(false);
      setFormData({ clientId: '', products: [], status: 'pending' });
      setFormErrors({ clientId: '', products: '', status: '' });
    };

    // Функция за затваряне на попъпа с детайли
    const closeDetailPopup = () => {
      setSelectedOrder(null);
    };

    // Функция за избор на клиент
    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, clientId: e.target.value }));
      setFormErrors((prev) => ({ ...prev, clientId: '' }));
    };

    // Функция за избор на статус
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, status: e.target.value }));
      setFormErrors((prev) => ({ ...prev, status: '' }));
    };

    // Функция за добавяне на нов продукт
    const addProduct = () => {
      setFormData((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          { productId: '', lotId: '', quantity: 1, productName: '', productPrice: 0, lotNumber: '', expiryDate: '' },
        ],
      }));
    };

    // Функция за премахване на продукт
    const removeProduct = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        products: prev.products.filter((_, i) => i !== index),
      }));
    };

    // Функция за промяна на продукт, партида или количество
    const handleProductChange = (index: number, field: 'productId' | 'lotId' | 'quantity', value: string | number) => {
      const updatedProducts = formData.products.map((p, i) => {
        if (i === index) {
          if (field === 'productId') {
            const product = products.find((prod) => prod._id === value);
            return {
              ...p,
              productId: value as string,
              productName: product ? product.name : '',
              productPrice: product ? product.price : 0,
              lotId: '',
              lotNumber: '',
              expiryDate: '',
            };
          }
          if (field === 'lotId') {
            const lot = lots.find((lot) => lot._id === value);
            return {
              ...p,
              lotId: value as string,
              lotNumber: lot ? lot.lotNumber : '',
              expiryDate: lot ? lot.expiryDate : '',
            };
          }
          return { ...p, [field]: value };
        }
        return p;
      });
      setFormData((prev) => ({ ...prev, products: updatedProducts }));
      setFormErrors((prev) => ({ ...prev, products: '' }));
    };

    // Функция за валидация на формата
    const validateForm = () => {
      const errors = { clientId: '', products: '', status: '' };
      let isValid = true;

      if (!formData.clientId) {
        errors.clientId = 'Изборът на клиент е задължителен';
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
          if (!p.lotId) {
            errors.products = 'Изберете партида за всеки продукт';
            isValid = false;
          }
          const selectedLot = lots.find((lot) => lot._id === p.lotId);
          if (!selectedLot || p.quantity > selectedLot.quantity) {
            errors.products = 'Количеството надвишава наличността на избраната партида';
            isValid = false;
          }
          if (p.quantity <= 0 || isNaN(p.quantity)) {
            errors.products = 'Въведете валидно количество за всеки продукт';
            isValid = false;
          }
        }
      }

      if (!formData.status) {
        errors.status = 'Изборът на статус е задължителен';
        isValid = false;
      }

      setFormErrors(errors);
      return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      let totalPrice = 0;
      const selectedProducts = formData.products.map((orderProd) => {
        const product = products.find((p) => p._id === orderProd.productId);
        if (product) {
          totalPrice += product.price * orderProd.quantity;
        }
        return {
          productId: orderProd.productId,
          lotId: orderProd.lotId,
          quantity: orderProd.quantity,
        };
      });

      if (formData.products.length !== selectedProducts.length) {
        setFormErrors((prev) => ({ ...prev, products: 'Невалидни продукти' }));
        return;
      }

      try {
        await createOrder({
          clientId: formData.clientId,
          products: selectedProducts,
          totalPrice,
          status: formData.status,
        });
        mutate();
        closeModal();
      } catch (error) {
        console.error('Грешка при изпращане на заявката:', error);
      }
    };

    // Дефиниция на колони за таблицата в попъпа
    const detailColDefs: ColDef<OrderProduct>[] = [
      { field: 'productName', headerName: 'Продукт', filter: true },
      { field: 'quantity', headerName: 'Количество', filter: true },
      { field: 'lotNumber', headerName: 'Партиден номер', filter: true },
      {
        field: 'expiryDate',
        headerName: 'Срок на годност',
        filter: true,
        valueFormatter: (params) => params.value ? new Date(params.value).toLocaleString('bg-BG') : 'Няма',
      },
      {
        field: 'productPrice',
        headerName: 'Цена',
        filter: true,
        valueFormatter: (params) => formatPrice(params.value),
      },
    ];
    const gridOptions = {  
      // set background colour on even rows again, this looks bad, should be using CSS classes
      getRowStyle: params => {
          if (params.node.rowIndex % 2 === 0) {
              return { background: '#0092b5' };
          }
      },
  
      // other grid options ...
  }
    return (
      <div className="bg-gray-800 min-h-screen p-6">
        <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Поръчки</h2>
            <button
              onClick={handleAddOrder}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Добави поръчка
            </button>
          </div>
          <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              gridOptions={gridOptions}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
              }}
            />
          </div>
        </div>

        {/* Модал за добавяне на поръчка */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-semibold text-white mb-4">Добави нова поръчка</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Клиент</label>
                  <select
                    value={formData.clientId}
                    onChange={handleClientChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  >
                    <option value="">Избери клиент...</option>
                    {clients?.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.firstName} {client.lastName || ''}
                      </option>
                    ))}
                  </select>
                  {formErrors.clientId && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.clientId}</p>
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
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-white">Партида</label>
                        <select
                          value={prod.lotId}
                          onChange={(e) => handleProductChange(index, 'lotId', e.target.value)}
                          className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                          disabled={!prod.productId}
                        >
                          <option value="">Избери партида...</option>
                          {prod.productId &&
                            lots
                              ?.filter((lot) => lot.productId === prod.productId)
                              .map((lot) => (
                                <option key={lot._id} value={lot._id}>
                                  {lot.lotNumber} (Наличност: {lot.quantity}, Срок: {lot.expiryDate ? new Date(lot.expiryDate).toLocaleString('bg-BG') : 'Няма'})
                                </option>
                              ))}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-white">Количество</label>
                        <input
                          type="number"
                          value={prod.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                          className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                          min="1"
                          max={prod.lotId ? lots.find((lot) => lot._id === prod.lotId)?.quantity || 0 : 0}
                          disabled={!prod.lotId}
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
                  <label className="block text-sm font-medium text-white">Статус</label>
                  <select
                    value={formData.status}
                    onChange={handleStatusChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  >
                    <option value="">Избери статус...</option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
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

        {/* Попъп за детайли на поръчката */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-white mb-4">Детайли за поръчка</h2>
              <div className="mb-4 text-white">
                <p><strong>Клиент:</strong> {selectedOrder.clientName}</p>
                <p><strong>Обща цена:</strong> {formatPrice(selectedOrder.totalPrice)}</p>
                <p><strong>Статус:</strong> {statusOptions.find((opt) => opt.value === selectedOrder.status)?.label || selectedOrder.status}</p>
                <p><strong>Създадена на:</strong> {new Date(selectedOrder.createdAt).toLocaleString('bg-BG')}</p>
              </div>
              <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
                <AgGridReact
                  rowData={selectedOrder.products}
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