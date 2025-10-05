export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

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
  minLength?: number;
  maxLength?: number;
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