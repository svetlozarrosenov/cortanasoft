import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import styles from './multiselect.module.css';

export default function MultiSelect({ control, parentName, index, productOptions, lotsOptions, errors, onDelete }: any): any {
  const { setValue, watch } = useFormContext();
  const productValue = watch(`${parentName}[${index}].productId`);
  const lotValue = watch(`${parentName}[${index}].lotId`);
  const quantityValue = watch(`${parentName}[${index}].quantity`);
  const selectedLots = watch('products');

  const [currentLots, setCurrentLots] = useState<any>([]);

  useEffect(() => {
    const filteredLots = lotsOptions?.filter((opt: any) => 
      opt.productId === productValue && 
      !selectedLots?.some((selected: any, sIndex: any) => 
        sIndex !== index && 
        selected.lotId === opt.value
      )
    ) || [];

    setCurrentLots(filteredLots);
  }, [productValue, JSON.stringify(selectedLots), lotsOptions]);

  const currentLot = currentLots.find((lot: any) => lot.value === lotValue);
  const maxQuantity = currentLot?.quantity || 0;
  const unitPrice = currentLot?.price || 0;

  useEffect(() => {
    if (quantityValue && unitPrice) {
      const calculatedPrice = quantityValue * unitPrice;
      setValue(`${parentName}[${index}].price`, calculatedPrice);
    } else {
      setValue(`${parentName}[${index}].price`, 0);
    }
  }, [quantityValue, unitPrice, setValue, parentName, index]);

  return (
    <div className={styles.multiselect}>
      <div className={styles.head}>
        <Controller
          name={`${parentName}[${index}].productId`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <div className={styles.select}>
              <label>Продукт</label>
              <select
                value={value || ''}
                onChange={(e) => {
                  onChange(e.target.value);
                  setValue(`${parentName}[${index}].productId`, e.target.value);
                }}
                ref={ref}
              >
                <option value="" disabled>Избери продукт...</option>
                {productOptions?.map((opt: any) => (
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
                disabled={!productValue}
                value={value || ''}
                onChange={(e) => {
                  onChange(e);
                }}
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
            <div>
              <label>Брой</label>
              <input
                disabled={!lotValue}
                value={value ?? ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '') {
                    onChange('');
                    return;
                  }
                  const newQuantity = parseInt(inputValue, 10);
                  if (isNaN(newQuantity)) {
                    onChange('');
                  } else if (newQuantity < 1) {
                    onChange(1);
                  } else if (newQuantity > maxQuantity && maxQuantity > 0) {
                    onChange(maxQuantity);
                  } else {
                    onChange(newQuantity);
                  }
                }}
                type="number"
                min={1}
                max={maxQuantity > 0 ? maxQuantity : undefined}
                placeholder="Количество"
                className={styles.quantity}
                ref={ref}
              />
            </div>
          )}
        />
        {errors?.[parentName]?.[index]?.quantity && (
          <p className={styles.frontEndErrors}>{errors[parentName][index].quantity.message}</p>
        )}

        <Controller
          name={`${parentName}[${index}].price`}
          control={control}
          render={({ field: { value } }) => (
            <div>
              <label>Цена</label>
              <input
                disabled
                value={value ?? 0}
                type="number"
                className={styles.quantity}
                readOnly
              />
            </div>
          )}
        />
      </div>

      <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
    </div>
  );
}