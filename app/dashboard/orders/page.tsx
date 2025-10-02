'use client';
import { useEffect, useState } from 'react';
import './orders.module.css';
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
import styles from '../dashboard-grid.module.css';
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
  const { userRole } = useUserRole();

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

  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    if (userRole) {
      const table = findTableFields(userRole, 'ordersSection', 'ordersTable');

      const modifiedColDefs = [
        {
          field: '_id',
          headerName: 'ID на поръчка',
          flex: 1,
          cellRenderer: (params: any) => (
            <Link
              href={`/dashboard/orders/${params.data._id}`}
              className="text-cyan-500 hover:text-cyan-600 underline"
            >
              {params.value}
            </Link>
          ),
        },
        ...table.map((col: any) => {
          const colDef: ColDef = {
            field: col.field || col.headerName,
            headerName: col.headerName,
            filter: col.filter || false,
            flex: col.flex || 1,
          };

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
            };
          }
          if (col.field === 'status') {
            colDef.valueFormatter = (params) => {
              const status = statusOptions.find((opt) => opt.value === params.value);
              return status ? status.label : params.value;
            };
          }
          if (col.field === 'createdAt') {
            colDef.valueFormatter = (params) => new Date(params.value).toLocaleString('bg-BG');
          }

          if (col.field === 'actions') {
            colDef.cellRenderer = null; // Премахване на бутона за детайли
          }

          return colDef;
        }),
      ];
      setColDefs(modifiedColDefs);
    }
  }, [userRole]);

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
          const product = products.find((prod: any) => prod._id === value);
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
          const lot = lots.find((lot: any) => lot._id === value);
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
    setFormData((prev: any) => ({ ...prev, products: updatedProducts }));
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
        const selectedLot = lots.find((lot: any) => lot._id === p.lotId);
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
      const product = products.find((p: any) => p._id === orderProd.productId);
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

  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

  return (
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Поръчки</h3>
      </div>
        <div className={styles.table}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
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