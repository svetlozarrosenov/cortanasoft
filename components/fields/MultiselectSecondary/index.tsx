import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import styles from '../multiselect/multiselect.module.css'

export default function MultiSelectSecondary({ control, parentName, index, options, errors, onDelete }: any): any {
  const { setValue, watch } = useFormContext();
  const productValue = watch(`${parentName}[${index}].productId`);

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
                {options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
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
                value={value ?? ''}
                onChange={(e) => {
                    onChange(e.target.value);
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
      </div>

      <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
    </div>
  );
}