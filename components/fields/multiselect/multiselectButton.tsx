import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from './multiselect-button.module.css';
import { useEffect } from 'react'; // Премахнах ненужния useState

export default function MultiSelectButton({ control, name, lotsOptions, productOptions, errors }: any) {
  const { watch, setValue, register } = useFormContext(); // Добавих register и setValue
  const selectedProducts = watch(name);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const totalPrice = watch('totalPrice') || 0; // Взимаме от watch за показване

  useEffect(() => {
    if (selectedProducts) {
      const sum = selectedProducts.reduce((acc, product) => acc + (product.price || 0), 0);
      setValue('totalPrice', sum); // Сетваме директно в формата
    } else {
      setValue('totalPrice', 0);
    }
  }, [JSON.stringify(selectedProducts), setValue]);

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      productId: '', 
      lotId: '', 
      quantity: 0,
      price: 0,
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
          lotsOptions={lotsOptions}
          productOptions={productOptions || []}
          errors={errors}
          onDelete={() => remove(index)}
        />
      ))}

      <button type="button" className={styles.button} onClick={handleAdd}>Добави още</button>

      {fields?.length > 0 && <div className={styles.total}>
        <label>Обща цена</label>
        <input
          disabled
          value={totalPrice}
          type="number"
          readOnly
        />
      </div>}

      <input type="hidden" {...register('totalPrice')} /> {/* Регистрираме полето в формата */}
    </>
  );
}