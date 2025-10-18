import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import styles from '../multiselect/multiselect.module.css';

export default function MultiSelect({ control, parentName, index, filterOptions, dataOptions, errors, onDelete }: any): any {
  const { setValue, watch } = useFormContext();
  const productValue = watch(`${parentName}[${index}].categoryId`);
  const lotValue = watch(`${parentName}[${index}].productId`);
  const selectedLots = watch('products');

  const [currentLots, setCurrentLots] = useState<any>([]);

  useEffect(() => {
    const filteredLots = dataOptions?.filter((opt: any) => 
      opt.categoryId === productValue && 
      !selectedLots?.some((selected: any, sIndex: any) => 
        sIndex !== index && 
        selected.productId === opt.value
      )
    ) || [];

    setCurrentLots(filteredLots);
  }, [productValue, JSON.stringify(selectedLots), dataOptions]);

  return (
    <div className={styles.multiselect}>
      <div className={styles.head}>
        <Controller
          name={`${parentName}[${index}].categoryId`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <div className={styles.select}>
              <label>Категория продукти</label>
              <select
                value={value || ''}
                onChange={(e) => {
                  onChange(e.target.value);
                  setValue(`${parentName}[${index}].categoryId`, e.target.value);
                }}
                ref={ref}
              >
                <option value="" disabled>Избери категория...</option>
                {filterOptions?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        />

        <Controller
          name={`${parentName}[${index}].productId`}
          control={control}
          rules={{ required: 'Продукт е задължителен' }}
          render={({ field: { onChange, value, ref } }) => (
            <div className={styles.select}>
              <label>Продукт</label>
              <select
                disabled={!productValue}
                value={value || ''}
                onChange={(e) => {
                  onChange(e);
                }}
                ref={ref}
              >
                <option value="" disabled>Избери продукт...</option>
                {currentLots.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors?.[parentName]?.[index]?.productId && (
                <p className={styles.frontEndErrors}>{errors[parentName][index].productId.message}</p>
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
                  } else {
                    onChange(newQuantity);
                  }
                }}
                type="number"
                min={1}
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
          rules={{ required: 'Цена е задължителна', min: { value: 0.01, message: 'Минимум 0.01' } }}
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <label>Цена</label>
              <input
                disabled={!lotValue}
                value={value ?? ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '') {
                    onChange('');
                    return;
                  }
                  const newPrice = parseFloat(inputValue);
                  if (isNaN(newPrice)) {
                    onChange('');
                  } else if (newPrice < 0.01) {
                    onChange(0.01);
                  } else {
                    onChange(newPrice);
                  }
                }}
                type="number"
                step="0.01"
                min={0.01}
                placeholder="Цена"
                className={styles.quantity}
                ref={ref}
              />
            </div>
          )}
        />
        {errors?.[parentName]?.[index]?.price && (
          <p className={styles.frontEndErrors}>{errors[parentName][index].price.message}</p>
        )}
      </div>

      <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
    </div>
  );
}