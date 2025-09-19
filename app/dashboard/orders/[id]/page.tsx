'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useClients } from '../../clients/hooks';
import { useParams } from 'next/navigation';
import { useOrders } from '../hooks';
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

interface InvoiceProduct {
  productName: string;
  quantity: number;
  productPrice: number;
}

interface InvoiceFormData {
  clientId: string;
  totalPrice: number;
  issueDate: string;
  products: InvoiceProduct[];
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

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { orders } = useOrders();
  const { clients } = useClients();
  const [order, setOrder] = useState<Order | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceFormData, setInvoiceFormData] = useState<InvoiceFormData>({
    clientId: '',
    totalPrice: 0,
    issueDate: new Date().toISOString().split('T')[0],
    products: [],
  });
  const [invoiceErrors, setInvoiceErrors] = useState({
    clientId: '',
    totalPrice: '',
    issueDate: '',
    products: '',
  });
  const [invoice, setInvoice] = useState<InvoiceFormData | null>(null); // Състояние за запазена фактура

  // Зареждане на данните за поръчката
  useEffect(() => {
    if (orders) {
      const foundOrder = orders.find((o: any) => o._id === orderId);
      setOrder(foundOrder || null);
      if (foundOrder) {
        const initialFormData = {
          clientId: foundOrder.clientId,
          totalPrice: foundOrder.totalPrice,
          issueDate: new Date().toISOString().split('T')[0],
          products: foundOrder.products.map((p: any) => ({
            productName: p.productName,
            quantity: p.quantity,
            productPrice: p.productPrice,
          })),
        };
        setInvoiceFormData(initialFormData);
        // Ако има съществуваща фактура, може да се зареди от API (тук ползваме локално състояние)
        setInvoice(initialFormData);
      }
    }
  }, [orders, orderId]);

  // Функция за отваряне на модала за издаване/редактиране на фактура
  const handleOpenInvoiceModal = (editMode: boolean = false) => {
    if (order) {
      setInvoiceFormData({
        clientId: order.clientId,
        totalPrice: order.totalPrice,
        issueDate: new Date().toISOString().split('T')[0],
        products: order.products.map((p) => ({
          productName: p.productName,
          quantity: p.quantity,
          productPrice: p.productPrice,
        })),
      });
      setInvoiceErrors({ clientId: '', totalPrice: '', issueDate: '', products: '' });
      setIsInvoiceModalOpen(true);
    }
  };

  // Функция за изтегляне на фактура
  const handleDownloadInvoice = () => {
    if (order) {
      console.log(`Изтегляне на фактура за поръчка с ID: ${order._id}`);
      // Тук може да се имплементира генериране и изтегляне на PDF или друг формат
    }
  };

  // Функция за затваряне на модала за фактура
  const closeInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceFormData({
      clientId: '',
      totalPrice: 0,
      issueDate: new Date().toISOString().split('T')[0],
      products: [],
    });
    setInvoiceErrors({ clientId: '', totalPrice: '', issueDate: '', products: '' });
  };

  // Функция за промяна на данни за фактурата
  const handleInvoiceFormChange = (
    field: 'clientId' | 'totalPrice' | 'issueDate' | 'products',
    value: string | number | InvoiceProduct[],
    index?: number,
    productField?: 'productName' | 'quantity' | 'productPrice'
  ) => {
    if (field === 'products' && typeof index === 'number' && productField) {
      const updatedProducts = invoiceFormData.products.map((p, i) =>
        i === index ? { ...p, [productField]: value } : p
      );
      const newTotalPrice = updatedProducts.reduce((sum, p) => sum + p.quantity * p.productPrice, 0);
      setInvoiceFormData((prev) => ({
        ...prev,
        products: updatedProducts,
        totalPrice: newTotalPrice,
      }));
      setInvoiceErrors((prev) => ({ ...prev, products: '' }));
    } else {
      setInvoiceFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setInvoiceErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Функция за валидация на формата за фактура
  const validateInvoiceForm = () => {
    const errors = { clientId: '', totalPrice: '', issueDate: '', products: '' };
    let isValid = true;

    if (!invoiceFormData.clientId) {
      errors.clientId = 'Изборът на клиент е задължителен';
      isValid = false;
    }

    if (invoiceFormData.totalPrice <= 0 || isNaN(invoiceFormData.totalPrice)) {
      errors.totalPrice = 'Общата цена трябва да е положителна';
      isValid = false;
    }

    if (!invoiceFormData.issueDate) {
      errors.issueDate = 'Моля, изберете дата на издаване';
      isValid = false;
    }

    if (invoiceFormData.products.length === 0) {
      errors.products = 'Добавете поне един продукт';
      isValid = false;
    } else {
      for (const p of invoiceFormData.products) {
        if (!p.productName) {
          errors.products = 'Името на продукта е задължително';
          isValid = false;
        }
        if (p.quantity <= 0 || isNaN(p.quantity)) {
          errors.products = 'Въведете валидно количество за всеки продукт';
          isValid = false;
        }
        if (p.productPrice <= 0 || isNaN(p.productPrice)) {
          errors.products = 'Въведете валидна цена за всеки продукт';
          isValid = false;
        }
      }
    }

    setInvoiceErrors(errors);
    return isValid;
  };

  // Функция за подаване на формата за фактура
  const handleInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInvoiceForm() || !order) return;

    try {
      console.log('Издаване/редактиране на фактура:', {
        orderId: order._id,
        clientId: invoiceFormData.clientId,
        totalPrice: invoiceFormData.totalPrice,
        issueDate: invoiceFormData.issueDate,
        products: invoiceFormData.products,
      });
      // Запазваме фактурата в състояние (в реално приложение би се изпратила към API)
      setInvoice(invoiceFormData);
      closeInvoiceModal();
    } catch (error) {
      console.error('Грешка при издаване/редактиране на фактура:', error);
      setInvoiceErrors((prev) => ({ ...prev, products: 'Възникна грешка при обработката на фактурата' }));
    }
  };

  // Дефиниция на колони за таблицата с продукти
  const detailColDefs: ColDef<OrderProduct>[] = [
    { field: 'productName', headerName: 'Продукт', filter: true },
    { field: 'quantity', headerName: 'Количество', filter: true },
    { field: 'lotNumber', headerName: 'Партиден номер', filter: true },
    {
      field: 'expiryDate',
      headerName: 'Срок на годност',
      filter: true,
      valueFormatter: (params) => (params.value ? new Date(params.value).toLocaleString('bg-BG') : 'Няма'),
    },
    {
      field: 'productPrice',
      headerName: 'Цена',
      filter: true,
      valueFormatter: (params) => formatPrice(params.value),
    },
  ];

  if (!order) {
    return (
      <div className="bg-gray-800 min-h-screen p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Детайли за поръчка</h2>
        <p className="text-white">Поръчката не е намерена</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="bg-[#0092b5] rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Детайли за поръчка {orderId}</h2>
        <div className="mb-4 text-white">
          <p>
            <strong>Клиент:</strong> {order.clientName}
          </p>
          <p>
            <strong>Обща цена:</strong> {formatPrice(order.totalPrice)}
          </p>
          <p>
            <strong>Статус:</strong>{' '}
            {statusOptions.find((opt: any) => opt.value === order.status)?.label || order.status}
          </p>
          <p>
            <strong>Създадена на:</strong> {new Date(order.createdAt).toLocaleString('bg-BG')}
          </p>
        </div>
        <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
          <AgGridReact
            rowData={order.products}
            columnDefs={detailColDefs}
            domLayout="autoHeight"
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => handleOpenInvoiceModal(false)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Създаване на фактура
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            title="Изтегли фактура"
          >
            <span className="inline-block w-4 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyMS4zNWwtMS40MS0xLjQxTDE2LjE3IDExLjVMOS41OSAzLjQ2TDEyIDIuMTFsOC40OCAxMS41LTguNDggMTEuNVoiLz48cGF0aCBkPSJNOS40OSAxMS41TDMuOTMgMy45NSAxMiAyLjA0IDkuNDkgMTEuNVoiLz48L3N2Zz4=')] bg-center bg-no-repeat bg-contain" />
          </button>
          <button
            onClick={() => handleOpenInvoiceModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Редактиране на фактура
          </button>
          {invoice && (
            <Link
              href={`/dashboard/invoices/${orderId}`}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Виж фактура
            </Link>
          )}
        </div>
      </div>

      {/* Модал за издаване/редактиране на фактура */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              {invoiceFormData.clientId ? 'Редактиране на фактура' : 'Издаване на фактура'}
            </h2>
            <form onSubmit={handleInvoiceSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Клиент</label>
                <select
                  value={invoiceFormData.clientId}
                  onChange={(e) => handleInvoiceFormChange('clientId', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери клиент...</option>
                  {clients?.map((client: any) => (
                    <option key={client._id} value={client._id}>
                      {client.firstName} {client.lastName || ''}
                    </option>
                  ))}
                </select>
                {invoiceErrors.clientId && (
                  <p className="text-red-400 text-sm mt-1">{invoiceErrors.clientId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Обща цена</label>
                <input
                  type="number"
                  value={invoiceFormData.totalPrice}
                  onChange={(e) => handleInvoiceFormChange('totalPrice', Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  step="0.01"
                  min="0"
                />
                {invoiceErrors.totalPrice && (
                  <p className="text-red-400 text-sm mt-1">{invoiceErrors.totalPrice}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Дата на издаване</label>
                <input
                  type="date"
                  value={invoiceFormData.issueDate}
                  onChange={(e) => handleInvoiceFormChange('issueDate', e.target.value)}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {invoiceErrors.issueDate && (
                  <p className="text-red-400 text-sm mt-1">{invoiceErrors.issueDate}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">Продукти</label>
                {invoiceFormData.products.map((prod, index) => (
                  <div key={index} className="flex flex-col mb-4 p-4 bg-gray-800 rounded-md">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-white">Име на продукта</label>
                      <input
                        type="text"
                        value={prod.productName}
                        onChange={(e) => handleInvoiceFormChange('products', e.target.value, index, 'productName')}
                        className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-white">Количество</label>
                      <input
                        type="number"
                        value={prod.quantity}
                        onChange={(e) => handleInvoiceFormChange('products', Number(e.target.value), index, 'quantity')}
                        className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                        min="1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-white">Цена</label>
                      <input
                        type="number"
                        value={prod.productPrice}
                        onChange={(e) => handleInvoiceFormChange('products', Number(e.target.value), index, 'productPrice')}
                        className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                ))}
                {invoiceErrors.products && (
                  <p className="text-red-400 text-sm mt-1">{invoiceErrors.products}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeInvoiceModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  {invoiceFormData.clientId ? 'Запази фактура' : 'Издай фактура'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}