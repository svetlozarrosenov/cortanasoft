import { FieldsConfig } from "@/utils/helpers";

export const fields: FieldsConfig = {
    name: {
      type: 'text',
      name: 'name',
      label: 'Име',
      required: true,
      placeholder: 'Име',
    },
    personInChargeId: {
        type: 'select',
        name: 'personInChargeId',
        label: 'МОЛ',
        options: [],
        placeholder: 'МОЛ',
    },
    eik: {
        type: 'text',
        name: 'eik',
        label: 'ЕИК',
        placeholder: 'ЕИК',
    },
    vatNumber: {
        type: 'text',
        name: 'vatNumber',
        label: 'ДДС номер',
        placeholder: 'ДДС номер',
    },
    currencyId: {
        type: 'select',
        name: 'currencyId',
        label: 'Валута',
        required: true,
        placeholder: 'Валута',
        options: []
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
    description: {
        type: 'textarea',
        name: 'description',
        label: 'Бележки',
        placeholder: 'Бележки',
    },
    industry: {
        type: 'select',
        name: 'industry',
        label: 'Индустрия',
        placeholder: 'Индустрия',
        options: [
            {value: 'trade', label: 'Търговия'},
            {value: 'services', label: 'Услуги'}
        ]
    },
    price: {
        type: 'text',
        name: 'price',
        label: 'Такса',
        placeholder: 'Такса',
        required: true,
    },
    charging: {
        type: 'select',
        name: 'charging',
        label: 'Период на таксуване',
        placeholder: 'Период на таксуване',
        required: true,
        options: [
            {value: 'monthly', label: 'Месечно'},
            {value: 'yearly', label: 'Годишно'}
        ]
    },
    roleInTheSystem: {
        type: 'select',
        name: 'roleInTheSystem',
        label: 'Роля в системата',
        placeholder: 'Роля в системата',
        required: true,
        options: []
    },
    iban: {
        type: 'text',
        name: 'iban',
        label: 'IBAN',
        placeholder: 'IBAN',
    },
    logo: {
        type: 'file',
        name: 'logo',
        label: 'Лого',
        placeholder: 'Лого',
    },
  };