import { useFieldArray, useFormContext, Controller } from 'react-hook-form'; // Добави Controller
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from '../multiselect/multiselect-button.module.css';
import { useEffect } from 'react';
import Select from 'react-select'; // Импорт за Select
import classNames from 'classnames'; // Ако използваш classNames (от dependencies ти)

export default function MultiSelectButton({ control, name, dataOptions, filterOptions, errors, company, currencyOptions }: any) {
  const { watch, setValue, register } = useFormContext();
  const selectedProducts = watch(name);
  const selectedCurrencyId = watch('currencyId');
  const exchangeRate = watch('exchangeRate');

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const isVatRegistered = company?.vatNumber?.trim() !== '';
  const companyCurrencyId = company?.currencyId; // Предполагам поле в company; адаптирай ако е друго

  // Set default currency on mount
  useEffect(() => {
    if (companyCurrencyId) {
      setValue('currencyId', companyCurrencyId);
    }
  }, [companyCurrencyId, setValue]);

  // Изчисляване на суми с конверсия
  useEffect(() => {
    if (selectedProducts) {
      let subtotal = 0;
      let totalVat = 0;
      selectedProducts.forEach((product: any) => {
        const base = (product.price || 0) * (product.quantity || 0);
        const vatRate = product.vatRate || 0;
        const vatAmount = base * (vatRate / 100);
        subtotal += base;
        totalVat += vatAmount;
      });
      let grandTotal = subtotal + totalVat;
    }
  }, [JSON.stringify(selectedProducts), selectedCurrencyId, exchangeRate, setValue]);

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      quantity: 0,
      productPrice: 0,
      totalProductPrice: 0,
      currencyId: company.currencyId,
      currencyRate: 0,
      vatRate: company.vatNumber ? 20 : 0,
    });
  };

  return (
    <>
      {fields.map((field, index) => (
        <MultiSelect
          key={field.id}
          control={control}
          parentName={name}
          index={index}
          dataOptions={dataOptions}
          filterOptions={filterOptions || []}
          errors={errors}
          onDelete={() => remove(index)}
          isVatRegistered={isVatRegistered}
          currencyOptions={currencyOptions}
          company={company}
        />
      ))}

      {fields?.length > 0 && (
        <div className={styles.total}>
          <label>Сума без ДДС (в избрана валута)</label>
          <input disabled value={watch('subtotal') || 0} type="number" readOnly />
          <label>Обща ДДС сума (в избрана валута)</label>
          <input disabled value={watch('totalVat') || 0} type="number" readOnly />
          <label>Обща сума (в избрана валута)</label>
          <input disabled value={watch('totalPrice') || 0} type="number" readOnly />
          {/* {isDifferentCurrency && (
            <>
              <label>Конвертирана сума без ДДС (в валутата на компанията)</label>
              <input disabled value={watch('convertedSubtotal') || 0} type="number" readOnly />
              <label>Конвертирана ДДС сума</label>
              <input disabled value={watch('convertedTotalVat') || 0} type="number" readOnly />
              <label>Конвертирана обща сума</label>
              <input disabled value={watch('convertedTotalPrice') || 0} type="number" readOnly />
            </> */}
          {/* )} */}
        </div>
      )}

      <button type="button" className={styles.button} onClick={handleAdd}>Добави още</button>
    </>
  );
}