import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from './multiselect-button.module.css';
import { useEffect, useState } from 'react';

export default function MultiSelectButton({ control, name, lotsOptions, productOptions, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      product: '', 
      lotId: '', 
      quantity: 0 
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
    </>
  );
}