
export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

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
    companyName: {
      type: 'text',
      name: 'companyName',
      label: 'Име на компанията',
      required: true,
      placeholder: 'Име на компанията',
    },
    responsiblePerson: {
        type: 'select',
        name: 'responsiblePerson',
        label: 'Отговорно лице',
        required: true,
        options: [],
        placeholder: 'Отговорно лице',
      },
    address: {
        type: 'text',
        name: 'address',
        label: 'Адрес',
        required: true,
        placeholder: 'Адрес',
    },
    country: {
        type: 'text',
        name: 'country',
        label: 'Държава',
        required: true,
        placeholder: 'Държава',
    },
    city: {
        type: 'text',
        name: 'city',
        label: 'Град',
        required: true,
        placeholder: 'Град',
    },
    email: {
        type: 'email',
        name: 'email',
        label: 'Имейл',
        required: true,
        placeholder: 'Имейл',
    },
    phone: {
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        required: true,
        placeholder: 'Телефон',
    },
  };