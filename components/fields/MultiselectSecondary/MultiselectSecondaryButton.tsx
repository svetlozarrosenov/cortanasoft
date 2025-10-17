import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import styles from '../multiselect/multiselect-button.module.css';
import { useEffect } from 'react';
import MultiSelectSecondary from './index';

export default function MultiSelectSecondaryButton({ control, name, options, errors }: any) {
  const { watch, setValue, register } = useFormContext();
  const selectedProducts = watch(name);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const totalPrice = watch('totalPrice') || 0;

  useEffect(() => {
    if (selectedProducts) {
      const sum = selectedProducts.reduce((acc: any, product: any) => acc + (product.price || 0), 0);
      setValue('totalPrice', sum);
    } else {
      setValue('totalPrice', 0);
    }
  }, [JSON.stringify(selectedProducts), setValue]);

  console.log('crb_totalPrice', selectedProducts)
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
        <MultiSelectSecondary
          key={field.id}
          control={control}
          parentName={name}
          index={index}
          options={options}
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

      <input type="hidden" {...register('totalPrice')} />
    </>
  );
}