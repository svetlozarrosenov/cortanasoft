import { FieldsConfig } from "@/utils/helpers";

export const fields: FieldsConfig = {
    companyName: {
      type: 'text',
      name: 'companyName',
      label: 'Име на компанията',
      required: true,
      placeholder: 'Име на компанията',
    },
    responsiblePerson: {
        type: 'text',
        name: 'responsiblePerson',
        label: 'Отговорно лице',
        required: true,
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