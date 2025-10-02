// Типизация за полетата
export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

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
    firstName: {
      type: 'text',
      name: 'firstName',
      label: 'Име',
      required: true,
      placeholder: 'Име',
    },
    middleName: {
        type: 'text',
        name: 'middleName',
        label: 'Презиме',
        required: true,
        placeholder: 'Презиме',
      },
    lastName: {
        type: 'text',
        name: 'lastName',
        label: 'Фамилия',
        required: true,
        placeholder: 'Фамилия',
    },
    email: {
        type: 'email',
        name: 'email',
        label: 'Имейл',
        required: true,
        placeholder: 'Имейл',
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
    phone: {
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        required: true,
        placeholder: 'Телефон',
    },
  };