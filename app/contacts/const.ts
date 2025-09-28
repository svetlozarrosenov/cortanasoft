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
  width?: number;
}

export type FieldsConfig = Record<string, Field>;

export const fields: FieldsConfig = {
    firstName: {
        type: 'text',
        name: 'firstName',
        label: 'First Name',
        required: true,
        placeholder: 'First Name',
    },
    lastName: {
        type: 'text',
        name: 'lastName',
        label: 'Last Name',
        required: true,
        placeholder: 'Last Name',
    },
    email: {
      type: 'email',
      name: 'email',
      label: 'Email address',
      required: true,
      placeholder: 'Email',
      maxLength: 500,
    },
    phone: {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        required: true,
        placeholder: '087 432 432',
    },
    title: {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      placeholder: 'Title',
    },
    message: {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      required: true,
      placeholder: 'Enter your message',
      minLength: 10,
      maxLength: 1000,
    },
  };