import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from '../multiselect/multiselect-button.module.css';
import { useEffect } from 'react';

export default function MultiSelectButton({ control, name, dataOptions, filterOptions, errors, company }: any) {
  const { watch, setValue, register } = useFormContext();
  const selectedProducts = watch(name);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const isVatRegistered = company?.vatNumber?.trim() !== ''; // Проверка за регистрация по ДДС

  // Изчисляване на общи суми
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
      const grandTotal = subtotal + totalVat;

      setValue('subtotal', subtotal);
      setValue('totalVat', totalVat);
      setValue('totalPrice', grandTotal);
    } else {
      setValue('subtotal', 0);
      setValue('totalVat', 0);
      setValue('totalPrice', 0);
    }
  }, [JSON.stringify(selectedProducts), setValue]);

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      productId: '', 
      categoryId: '', 
      quantity: 0,
      price: 0,
      vatRate: 20 // Дефолт 20% за всеки нов продукт
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
          isVatRegistered={isVatRegistered} // Предай към MultiSelect
        />
      ))}

      <button type="button" className={styles.button} onClick={handleAdd}>Добави още</button>

      {fields?.length > 0 && (
        <div className={styles.total}>
          <label>Сума без ДДС</label>
          <input disabled value={watch('subtotal') || 0} type="number" readOnly />
          <label>Обща ДДС сума</label>
          <input disabled value={watch('totalVat') || 0} type="number" readOnly />
          <label>Обща сума (с ДДС)</label>
          <input disabled value={watch('totalPrice') || 0} type="number" readOnly />
        </div>
      )}

      {/* Hidden inputs за backend */}
      <input type="hidden" {...register('subtotal')} />
      <input type="hidden" {...register('totalVat')} />
      <input type="hidden" {...register('totalPrice')} />
    </>
  );
}