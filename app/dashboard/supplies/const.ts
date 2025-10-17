
export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'multiselect' | 'multiselectSecondary' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  value?: any;
  options?: { value: string; label: string }[]; // За select и radio
  required?: boolean;
  pattern?: RegExp; // За валидация (напр. email)
  min?: number; // За number и date
  max?: number; // За number и date
  minLength?: number;
  maxLength?: number;
}

export type FieldsConfig = Record<string, Field>;

export const fields: FieldsConfig = {
    supplierId: {
        type: 'select',
        name: 'supplierId',
        label: 'Доставчик',
        required: true,
        options: [],
        placeholder: 'Доставчик',
    },
    locationId: {
        type: 'select',
        name: 'locationId',
        label: 'Локация',
        required: true,
        options: [],
        placeholder: 'Локация',
    },
    products: {
        type: 'multiselectSecondary',
        name: 'products',
        label: 'Продукти',
        required: true,
        options: [],
    },
    status: {
        type: 'text',
        name: 'status',
        label: 'Статус',
        required: true,
        placeholder: 'Статус',
    },
    price: {
        type: 'text',
        name: 'price',
        label: 'Цена',
        required: true,
        placeholder: 'Цена',
    },
    currency: {
        type: 'text',
        name: 'currency',
        label: 'Валута',
        required: true,
        placeholder: 'Валута',
    },
    deliveryDate: {
        type: 'datetime-local',
        name: 'deliveryDate',
        label: 'Дата на доставката',
        required: true,
        placeholder: 'Дата на доставката',
    },
};