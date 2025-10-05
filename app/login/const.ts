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
    email: {
      type: 'email',
      name: 'email',
      label: 'Email address',
      required: true,
      placeholder: 'Email',
      maxLength: 500,
    },
    password: {
        type: 'password',
        name: 'password',
        label: 'Password',
        required: true,
        placeholder: 'password',
    },
  };