import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from '../multiselect/multiselect-button.module.css';
import { useEffect } from 'react';

export default function MultiSelectButton({ control, name, dataOptions, filterOptions, errors }: any) {
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

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      productId: '', 
      categoryId: '', 
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
          dataOptions={dataOptions}
          filterOptions={filterOptions || []}
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