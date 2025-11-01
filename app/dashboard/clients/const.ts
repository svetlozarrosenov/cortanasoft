import { FieldsConfig } from "@/utils/helpers";

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
    address: {
      type: 'text',
      name: 'address',
      label: 'Адрес',
      required: true,
      placeholder: 'Адрес',
    },
    phone: {
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        required: true,
        placeholder: 'Телефон',
    },
    eik: {
      type: 'text',
      name: 'eik',
      label: 'ЕИК/ЕГН',
      placeholder: 'ЕИК/ЕГН',
    },
  };