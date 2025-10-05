import classNames from 'classnames';
import React, { useState } from 'react';
import Select from 'react-select';
import styles from './multiselect.module.css';
import { FaTrash } from 'react-icons/fa';

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options?: Option[];
  defaultValue?: Option[];
  onChange?: (selected: any) => any;
  errors: any;
  fields: any
  ref: any
  product: any
  onProductChange: any;
  onBatchChange: any;
  onQuantityChange: any;
  onDelete: any;
}

export default function MultiSelect({ fields, errors, ref, product, onProductChange, onBatchChange, onQuantityChange, onDelete }: MultiSelectProps) {
  console.log('crb_fields', fields)
  console.log('crb_product', product)

  return (
    <>
      <div className={styles.multiselect}>
        <div className={styles.head}>
          <div className={styles.select}>
            <label 
              htmlFor={fields.name} 
            >Продукт</label>

            <select
              id={fields.name}
              onChange={() => onProductChange()}
              // onBlur={onBlur}
              value={''}
              ref={ref}
            >
              <option value="" disabled>
                Избери продукт...
              </option>
              {fields.productOptions?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.select}>
            <label 
              htmlFor={fields.name} 
            >Партида</label>

            <select
              id={fields.name}
              onChange={() => onBatchChange()}
              // onBlur={onBlur}
              value={''}
              ref={ref}
              >
              <option value="" disabled>
                Избери партида...
              </option>
              {fields.lotsOptions?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.body}>
          <input onClick={onQuantityChange} type="number" placeholder={'Количество'} className={styles.quantity} />
        </div>

        <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
      </div>
    </>
  );
}