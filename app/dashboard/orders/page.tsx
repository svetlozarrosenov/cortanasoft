'use client';
import { useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from '../dashboard.module.css';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Select from 'react-select';
import { useClients } from '../clients/hooks';
import { useProducts } from '../products/all/hooks';
import { useOrders, createOrder } from './hooks';

// Регистриране на AG Grid модули
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
  quantity: number;
}

interface OrderProduct {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
}

interface Order {
  _id: string;
  clientId: string;
  clientName: string;
  products: OrderProduct[];
  totalPrice: number;
  status: string, 
  annexedAt: string;
  updatedAt: string;
  client: Client;
}

// Функция за форматиране на цена в евро
const formatPrice = (price: number) => {
  return price?.toLocaleString('bg-BG', { style: 'currency', currency: 'EUR' });
};

export default function OrdersPage() {
  const { clients } = useClients();
  const { products } = useProducts();
  const { orders: rowData, mutate } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Опции за react-select за клиенти
  const clientOptions = clients?.map((client) => ({
    value: client._id,
    label: `${client.firstName} ${client.lastName || ''}`,
  })) || [];

  // Опции за react-select за продукти
  const productOptions = products?.map((product) => ({
    value: product._id,
    label: product.name,
  })) || [];

  // Опции за статус на поръчката
  const statusOptions = [
    { value: 'pending', label: 'В обработка' },
    { value: 'shipped', label: 'Изпратена' },
    { value: 'delivered', label: 'Доставена' },
    { value: 'canceled', label: 'Отменена' },
  ];

  // Дефиниция на колони за главната таблица
  const [colDefs, setColDefs] = useState<ColDef<Order>[]>([
    {
      field: 'clientName',
      headerName: 'Клиент',
      filter: true,
    },
    {
      field: 'totalPrice',
      headerName: 'Обща цена',
      filter: true,
      valueFormatter: (params) => formatPrice(params.value),
    },
    {
      field: 'status',
      headerName: 'Статус',
      filter: true,
      valueFormatter: (params) => {
        const status = statusOptions.find((opt) => opt.value === params.value);
        return status ? status.label : params.value;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Създадена на',
      filter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleString('bg-BG'),
    },
    {
      headerName: 'Действия',
      cellRenderer: (params: any) => (
        <button
          onClick={() => setSelectedOrder(params.data)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded transition duration-200"
        >
          Детайли
        </button>
      ),
      width: 120,
    },
  ]);

  // Персонализирани стилове за react-select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f9fafb' : '#ffffff',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      color: '#1f2937',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#ffffff',
      color: '#1f2937',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e5e7eb' : '#ffffff',
      color: '#1f2937',
      '&:hover': {
        backgroundColor: '#d1d5db',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#1f2937',
    }),
    controlDark: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#374151' : '#1f2937',
      borderColor: state.isFocused ? '#3b82f6' : '#4b5563',
      color: '#f9fafb',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menuDark: (provided: any) => ({
      ...provided,
      backgroundColor: '#1f2937',
      color: '#f9fafb',
    }),
    optionDark: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4b5563' : '#1f2937',
      color: '#f9fafb',
      '&:hover': {
        backgroundColor: '#6b7280',
      },
    }),
    singleValueDark: (provided: any) => ({
      ...provided,
      color: '#f9fafb',
    }),
  };

  // Състояние за модала за добавяне
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientId: null as string | null,
    products: [] as OrderProduct[],
    status: 'pending' as string,
  });
  const [formErrors, setFormErrors] = useState({
    clientId: '',
    products: '',
    status: '',
  });

  // Функция за отваряне на модала за добавяне
  const handleAddOrder = () => {
    setIsModalOpen(true);
  };

  // Функция за затваряне на модала за добавяне
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ clientId: null, products: [], status: 'pending' });
    setFormErrors({ clientId: '', products: '', status: '' });
  };

  // Функция за затваряне на попъпа с детайли
  const closeDetailPopup = () => {
    setSelectedOrder(null);
  };

  // Функция за избор на клиент
  const handleClientChange = (selectedOption: any) => {
    setFormData((prev) => ({ ...prev, clientId: selectedOption ? selectedOption.value : null }));
    setFormErrors((prev) => ({ ...prev, clientId: '' }));
  };

  // Функция за избор на статус
  const handleStatusChange = (selectedOption: any) => {
    setFormData((prev) => ({ ...prev, status: selectedOption ? selectedOption.value : 'pending' }));
    setFormErrors((prev) => ({ ...prev, status: '' }));
  };

  // Функция за добавяне на нов продукт
  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: '', quantity: 1, productName: '', productPrice: 0 }],
    }));
  };

  // Функция за премахване на продукт
  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  // Функция за промяна на продукт или количество
  const handleProductChange = (index: number, field: 'productId' | 'quantity', value: string | number) => {
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
        return { ...p, [field]: value };
      }
      return p;
    });
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
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
          break;
        }
        if (p.quantity <= 0 || isNaN(p.quantity)) {
          errors.products = 'Въведете валидно количество за всеки продукт';
          isValid = false;
          break;
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

  // Функция за изпращане на формата
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Изчисляване на totalPrice
    let totalPrice = 0;
    const selectedProducts = formData.products.map((orderProd) => {
      const product = products.find((p) => p._id === orderProd.productId);
      if (product) {
        totalPrice += product.price * orderProd.quantity;
      }
      return {
        productId: orderProd.productId,
        quantity: orderProd.quantity,
      };
    });

    if (formData.products.length !== selectedProducts.length) {
      setFormErrors((prev) => ({ ...prev, products: 'Невалидни продукти' }));
      return;
    }

    try {
      await createOrder({
        clientId: formData.clientId!,
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
    {
      field: 'productPrice',
      headerName: 'Цена',
      filter: true,
      valueFormatter: (params) => formatPrice(params.value),
    },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={styles.cardTitle}>Поръчки</h2>
          <button
            onClick={handleAddOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Добави поръчка
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

      {/* Модал за добавяне на поръчка */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${styles.card} w-full max-w-md`}>
            <h2 className={styles.cardTitle}>Добави нова поръчка</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Клиент
                </label>
                <Select
                  options={clientOptions}
                  isClearable
                  placeholder="Избери клиент..."
                  onChange={handleClientChange}
                  className="mt-1"
                  classNamePrefix="react-select"
                  styles={{
                    control: customStyles.control,
                    menu: customStyles.menu,
                    option: customStyles.option,
                    singleValue: customStyles.singleValue,
                    controlDark: customStyles.controlDark,
                    menuDark: customStyles.menuDark,
                    optionDark: customStyles.optionDark,
                    singleValueDark: customStyles.singleValueDark,
                  }}
                />
                {formErrors.clientId && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.clientId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Продукти
                </label>
                {formData.products.map((prod, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Select
                      options={productOptions}
                      value={productOptions.find((opt) => opt.value === prod.productId) || null}
                      onChange={(selected) =>
                        handleProductChange(index, 'productId', selected ? selected.value : '')
                      }
                      placeholder="Избери продукт..."
                      className="flex-1 mr-2"
                      classNamePrefix="react-select"
                      styles={{
                        control: customStyles.control,
                        menu: customStyles.menu,
                        option: customStyles.option,
                        singleValue: customStyles.singleValue,
                        controlDark: customStyles.controlDark,
                        menuDark: customStyles.menuDark,
                        optionDark: customStyles.optionDark,
                        singleValueDark: customStyles.singleValueDark,
                      }}
                    />
                    <input
                      type="number"
                      value={prod.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                      className="w-20 border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white mr-2"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded transition duration-200"
                    >
                      X
                    </button>
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
                  <p className="text-red-500 text-sm mt-1">{formErrors.products}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Статус
                </label>
                <Select
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === formData.status) || null}
                  onChange={handleStatusChange}
                  placeholder="Избери статус..."
                  className="mt-1"
                  classNamePrefix="react-select"
                  styles={{
                    control: customStyles.control,
                    menu: customStyles.menu,
                    option: customStyles.option,
                    singleValue: customStyles.singleValue,
                    controlDark: customStyles.controlDark,
                    menuDark: customStyles.menuDark,
                    optionDark: customStyles.optionDark,
                    singleValueDark: customStyles.singleValueDark,
                  }}
                />
                {formErrors.status && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.status}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
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
          <div className={`${styles.card} w-full max-w-md`}>
            <h2 className={styles.cardTitle}>Детайли за поръчка</h2>
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200"
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