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
    name: {
        type: 'text',
        name: 'name',
        label: 'Име',
        required: true,
    },
    model: {
      type: 'text',
      name: 'model',
      label: 'Модел',
      required: true,
    },
    description: {
      type: 'textarea',
      name: 'description',
      label: 'Описание',
      required: true,
    },
    categoryId: {
      type: 'select',
      name: 'categoryId',
      label: 'Категория',
      required: true,
      options: [],
    },
    salePrice: {
        type: 'number',
        name: 'salePrice',
        label: 'Продажна цена',
        required: true,
    },
    vat: {
      type: 'select',
      name: 'vat',
      label: 'ДДС',
      required: true,
      options: [
        {value: '0', label: '0%'},
        {value: '5', label: '5%'},
        {value: '9', label: '9%'},
        {value: '10', label: '10%'},
        {value: '20', label: '20%'}
      ],
    },
    costPrice: {
      type: 'number',
      name: 'costPrice',
      label: 'Доставна цена',
      required: true,
    },
  };