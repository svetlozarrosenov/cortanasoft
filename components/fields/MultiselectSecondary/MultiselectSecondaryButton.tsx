import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';
import styles from './multiselect-button.module.css';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/utils/helpers';

export default function MultiSelectButton({ control, name, dataOptions, filterOptions, errors, company, currencyOptions }: any) {
  const { watch, setValue } = useFormContext();
  const selectedProducts = watch(name);
  const [totalPrice, setTotalPrice] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const isVatRegistered = company?.vatNumber?.trim() !== '';
  
  useEffect(() => {
    if (selectedProducts?.length) {
      let grandTotal = 0;
      selectedProducts.forEach((product: any) => {
        grandTotal += product.totalCostPrice;
      });

      setTotalPrice(grandTotal);
      setValue('totalPrice', grandTotal);
    }
  }, [JSON.stringify(selectedProducts), setValue]);

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      quantity: 0,
      costPrice: 0,
      totalCostPrice: 0,
      currencyId: company.currencyId,
      currencyRate: 0,
      productId: '',
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
           <label>Обща сума:</label>
            
            <p>{formatPrice(totalPrice, company.currency)}</p>
        </div>
      )}

      <button type="button" className={styles.button} onClick={handleAdd}>Добави още</button>
    </>
  );
}