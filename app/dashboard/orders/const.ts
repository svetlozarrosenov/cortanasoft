import { FieldsConfig } from "@/utils/helpers";

export const fields: FieldsConfig = {
    clientId: {
      type: 'select',
      name: 'clientId',
      label: 'Клиент',
      required: true,
      options: [],
    },
    orderDate: {
      type: 'datetime-local',
      name: 'orderDate',
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
      defaultValue: 'delivered',
      options: [
        { value: 'pending', label: 'В процес' },
        { value: 'shipped', label: 'Доставя се' },
        { value: 'delivered', label: 'Доставена' },
        { value: 'canceled', label: 'Отказана' },
      ],
    },
    lots: {
      type: 'multiselect',
      name: 'lots',
      label: 'Продукти',
      required: true,
      dataOptions: [],
    },
  };