import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from './multiselect-button.module.css';
import { useEffect, useState } from 'react';

export default function MultiSelectButton({ control, name, lotsOptions, productOptions, errors }: any) {
  const { setValue, getValues, watch } = useFormContext();
  const selectedLots = getValues('products');

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [currentLots, setCurrentLots] = useState(lotsOptions);


  useEffect(() => {
    setCurrentLots(
      lotsOptions?.filter((lot: any) => 
        !selectedLots?.some((selected: any) => selected.lotId === lot.value)
      )
    );
  }, [selectedLots, lotsOptions]);

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
          lotOptions={currentLots}
          productOptions={productOptions || []}
          errors={errors}
          onDelete={() => remove(index)}
          onDeleteLot={(lotIdTest: any, quantity: any) => {
            const currentLotsWithoutChangedOne = currentLots.filter((lot: any) => {
              return lot.value !== lotIdTest;
            })

            setCurrentLots(currentLotsWithoutChangedOne);
          }}
        />
      ))}

      <button type="button" className={styles.button} onClick={handleAdd}>Добави още</button>
    </>
  );
}