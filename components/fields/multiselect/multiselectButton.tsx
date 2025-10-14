import { useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from './multiselect-button.module.css';
import { useState } from 'react';

export default function MultiSelectButton({ control, name, lotsOptions, productOptions, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [currentLots, setCurrentLots] = useState(lotsOptions);

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
            console.log('crb_currentLots', currentLots)
            const currentLotsWithoutChangedOne = currentLots.filter((lot: any) => {
              return lot.value !== lotIdTest;
            })
            const findedLot = currentLots.find((lot: any) => {
              return lot.value === lotIdTest;
            })

            findedLot.quantity = findedLot.quantity - quantity;
            findedLot.label = `${findedLot.name}, available: ${findedLot.quantity}, expiry: ${findedLot.expiryDate}`,
            setCurrentLots(currentLotsWithoutChangedOne.concat([findedLot]));
          }}
        />
      ))}

      <button type="button" className={styles.button} onClick={handleAdd}>Добави още</button>
    </>
  );
}