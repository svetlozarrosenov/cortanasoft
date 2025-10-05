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
    title: {
      type: 'text',
      name: 'title',
      label: 'Заглавие',
      required: true,
      placeholder: 'Въведи заглавие',
    },
    description: {
      type: 'textarea',
      name: 'description',
      label: 'Описание',
      required: true,
      placeholder: 'Въведи описание',
      maxLength: 500,
    },
    reporter: {
      type: 'select',
      name: 'reporter',
      label: 'Докладващ',
      required: true,
      options: [
        { value: 'user1', label: 'Иван Иванов' },
        { value: 'user2', label: 'Мария Петрова' },
        { value: 'user3', label: 'Георги Димитров' },
      ],
    },
    assignee: {
      type: 'select',
      name: 'assignee',
      label: 'Отговорник',
      required: true,
      options: [
        { value: 'user1', label: 'Иван Иванов' },
        { value: 'user2', label: 'Мария Петрова' },
        { value: 'user3', label: 'Георги Димитров' },
      ],
    },
    deadline: {
      type: 'datetime-local',
      name: 'deadline',
      label: 'Краен срок',
      required: true,
    },
    isRecurring: {
      value: false,
      type: 'checkbox',
      name: 'isRecurring',
      label: 'Повтарящ се',
      required: false,
    },
    recurrenceInterval: {
      type: 'select',
      name: 'recurrenceInterval',
      label: 'Интервал',
      required: false,
      options: [
        {value: "daily", label: "Дневно"},
        {value: "weekly", label: "Седмично"},
        {value: "monthly", label: "Месечно"}
      ]
    },
    status: {
      type: 'select',
      name: 'status',
      label: 'Статус',
      required: false,
      options: [
        {value: "pending", label: "Чакаща"},
        {value: "in_progress", label: "В процес"},
        {value: "completed", label: "Завършена"}
      ]
    }
  };