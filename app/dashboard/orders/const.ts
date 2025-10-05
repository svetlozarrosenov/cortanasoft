export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  value?: any;
  options?: { value: string; label: string }[];
  required?: boolean;
  pattern?: RegExp;
  min?: number;
  max?: number;
  productOptions?: { value: string; label: string }[];
  batchOptions?: { value: string; label: string }[];
  minLength?: number;
  maxLength?: number;
  lotsOptions?: { value: string; label: string }[];
}

export type FieldsConfig = Record<string, Field>;

export const fields: FieldsConfig = {
    clients: {
        type: 'select',
        name: 'clients',
        label: 'Клиент',
        required: true,
        options: [],
      },
    products: {
      type: 'multiselect',
      name: 'products',
      label: 'Продукти',
      required: true,
      productOptions: [],
      lotsOptions: [],
    },
    status: {
        type: 'select',
        name: 'status',
        label: 'Статус',
        required: true,
        options: [
          { value: 'pending', label: 'В процес' },
          { value: 'shipped', label: 'Доставя се' },
          { value: 'delivered', label: 'Доставена' },
          { value: 'canceled', label: 'Отказана' },
        ],
      },
  };