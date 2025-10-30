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
    description: {
      type: 'textarea',
      name: 'description',
      label: 'Описание',
    },
  };