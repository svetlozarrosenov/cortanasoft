export const findTableFields = (userRole: any, sectionId: any, tableId: any, level = 0) => {
  let section: any= [];

  switch(level) {
    case 0:
      section = userRole?.permissions?.find((permission: any) => permission.sectionId === sectionId);
      break;
    case 1:
      userRole?.permissions?.find((permission: any) => permission?.children.find((childPermis: any) => {
        if(childPermis.sectionId  === sectionId) {
          section = childPermis;
        }
        return childPermis.sectionId  === sectionId}
      ));
      break;
  }

  const table = section?.tables?.find((table: any) => table.id === tableId)

  return table?.fields;
}

export const formatPrice = (price: number, companyCurrencyCode: string) => {
  if(!companyCurrencyCode ) {
    return price;
  }
  return Number(price)?.toLocaleString('bg-BG', { style: 'currency', currency: companyCurrencyCode });
};

export const priceWithoutVat = (price: number, vatRate: number) => {
  return price / (1 + (vatRate/100));
}

export function calculateVat(priceWithVat: number, vatRate: number): number {
  if (priceWithVat <= 0) {
    throw new Error('Цената трябва да е положителна.');
  }
  
  const priceWithoutVat = priceWithVat / (1 + (vatRate / 100));
  const vatAmount = priceWithVat - priceWithoutVat;
  
  return parseFloat(vatAmount.toFixed(2)); 
}

export const getDefaultValues = (fields: any) => {
  const defaults: any = {};
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue;
    }
  });

  defaults.deliveryDate = new Date().toISOString().slice(0, 16);
  return defaults;
};

export type FieldType = 'file' | 'text' | 'email' | 'password' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'number' | 'datetime-local';

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
  defaultValue?: any;
  dataOptions?: any;
}

export type FieldsConfig = Record<string, Field>;