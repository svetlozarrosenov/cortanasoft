import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import styles from './multiselect.module.css';

export default function MultiSelect({ control, parentName, index, productOptions, lotOptions, errors, onDelete, onDeleteLot }: any): any {
  const { setValue, getValues, watch } = useFormContext();
  const selectedProduct = getValues(`${parentName}[${index}].product`);
  const [currentLots, setCurrentLots] = useState(lotOptions);

  const productValue = watch(`${parentName}[${index}].product`);
  const lotValue = watch(`${parentName}[${index}].lotId`);
  console.log('crb_currentLots', currentLots)
  useEffect(() => {
    const filteredLots = lotOptions?.filter((opt: any) => opt.productId === selectedProduct)

    setCurrentLots(filteredLots);
  }, [productValue]);

  return (
    <div className={styles.multiselect}>
      <div className={styles.head}>
        <Controller
          name={`${parentName}[${index}].product`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <div className={styles.select}>
              <label>Продукт</label>
              <select
                value={value || ''}
                onChange={(e) => {
                  onChange(e.target.value);
                  setValue(`${parentName}[${index}].product`, e.target.value);
                }}
                ref={ref}
              >
                <option value="" disabled>Избери продукт...</option>
                {productOptions?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        />

        <Controller
          name={`${parentName}[${index}].lotId`}
          control={control}
          rules={{ required: 'Партида е задължителна' }}
          render={({ field: { onChange, value, ref } }) => (
            <div className={styles.select}>
              <label>Партида</label>
              <select
                value={value || ''}
                onChange={onChange}
                ref={ref}
              >
                <option value="" disabled>Избери партида...</option>
                {currentLots.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
              </select>
              {errors?.[parentName]?.[index]?.lotId && (
                <p className={styles.frontEndErrors}>{errors[parentName][index].lotId.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className={styles.body}>
        <Controller
          name={`${parentName}[${index}].quantity`}
          control={control}
          rules={{ required: 'Количество е задължително', min: { value: 1, message: 'Минимум 1' } }}
          render={({ field: { onChange, value, ref } }) => (
            <input
              value={value || ''}
              onChange={(е) => {
                const currentLot = currentLots.find((lot: any) => lot.value === lotValue);
                console.log('crb_lotValue', lotValue)
                if(value > currentLot.quantity) {
                  onChange();
                }
                onChange(е);
                onDeleteLot(lotValue, value);
              }}
              type="number"
              placeholder="Количество"
              className={styles.quantity}
              ref={ref}
            />
          )}
        />
        {errors?.[parentName]?.[index]?.quantity && (
          <p className={styles.frontEndErrors}>{errors[parentName][index].quantity.message}</p>
        )}
      </div>

      <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
    </div>
  );
}