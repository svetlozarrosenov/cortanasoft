
export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'multiselect' | 'multiselectSecondary' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  filterOptions?: any;
  dataOptions?: any;
  value?: any;
  options?: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: any;
  pattern?: RegExp;
  min?: number;
  max?: number;
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
    deliveryDate: {
        type: 'datetime-local',
        name: 'deliveryDate',
        label: 'Дата на доставката',
        required: true,
        placeholder: 'Дата на доставката',
        defaultValue: new Date().toISOString().slice(0, 16),
    },
    status: {
        type: 'select',
        name: 'status',
        label: 'Статус',
        required: true,
        placeholder: 'Статус',
        defaultValue: 'received',
        options: [
            {value: 'pending', label: 'Очакваща'},
            {value: 'received', label: 'Получена'},
            {value: 'canceled', label: 'Отменена'},
        ]
    },
    products: {
        type: 'multiselectSecondary',
        name: 'products',
        label: 'Продукти',
        required: true,
        filterOptions: [],
        dataOptions: [],
    },
};