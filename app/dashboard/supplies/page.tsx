'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useProducts } from '../products/all/hooks';
import { useSuppliers } from '../suppliers/hooks';
import { useSupplies, createSupply } from './hooks';
import { useLocations } from '../locations/hooks';
import { useUserRole } from '../companies/[id]/hooks';
import { findTableFields } from '@/utils/helpers';
import styles from '../dashboard-grid.module.css';

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

  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState([]);

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

  useEffect(() => {
    if(userRole) {
      const table = findTableFields(userRole, "suppliesSection", "suppliesTable")
 
      const modifiedColDefs = table.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };

        if (col.field === 'price') { // Поправка на грешката от 'price]' на 'price'
          colDef.valueFormatter = (params) => formatPrice(params.data.price, params.data.currency);
        }
        
        if (col.field === 'status') {
          colDef.valueFormatter = (params) => {
            const statusMap: Record<string, string> = {
              pending: 'Очакваща',
              received: 'Получена',
              canceled: 'Отменена',
            };
            return statusMap[params.value] || params.value;
          };
        }

        if (col.field === 'deliveryDate') {
          colDef.valueFormatter = (params) => new Date(params.value).toLocaleString('bg-BG');
        }

        if (col.field === 'actions') {
          colDef.cellRenderer = (params: any) => (
            <button
              onClick={() => setSelectedSupply(params.data)}
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

  // Добавяне на gridOptions за стилизиране на редовете
  const gridOptions = {
    getRowStyle: (params: any) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#0092b5' };
      }
    },
  };

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
const statusOptions: any = []
  const handleProductChange = (index: number, field: keyof SupplyProduct, value: string | number | boolean) => {
    const updatedProducts = formData.products.map((p, i) => {
      if (i === index) {
        if (field === 'productId') {
          const product = products.find((prod: any) => prod._id === value);
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
        const product = products.find((prod: any) => prod._id === p.productId);
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
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Доставки</h3>
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