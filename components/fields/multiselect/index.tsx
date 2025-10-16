import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import styles from './multiselect.module.css';

export default function MultiSelect({ control, parentName, index, productOptions, lotsOptions, errors, onDelete }: any): any {
  const { setValue, watch } = useFormContext();
  const productValue = watch(`${parentName}[${index}].product`);
  const lotValue = watch(`${parentName}[${index}].lotId`);
  const selectedLots = watch('products');

  const [currentLots, setCurrentLots] = useState([]);

  useEffect(() => {
    const filteredLots = lotsOptions?.filter((opt: any) => 
      opt.productId === productValue && 
      !selectedLots?.some((selected, sIndex) => 
        sIndex !== index && 
        selected.lotId === opt.value
      )
    ) || [];

    setCurrentLots(filteredLots);
  }, [productValue, JSON.stringify(selectedLots), lotsOptions]);

  const currentLot = currentLots.find((lot: any) => lot.value === lotValue);
  const maxQuantity = currentLot?.quantity || 0;

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