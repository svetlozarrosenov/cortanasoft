import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import styles from '../multiselect/multiselect.module.css';
import classNames from 'classnames';

export default function MultiSelect({ control, parentName, index, dataOptions, errors, onDelete, isVatRegistered }: any): any {
  const { setValue, watch, register } = useFormContext(); // Добави register за vatRate
  const lotValue = watch(`${parentName}[${index}].lotId`);
  const selectedLots = watch(parentName);

  const [currentLots, setCurrentLots] = useState<any>([]);

  useEffect(() => {
    const filteredLots = dataOptions?.filter((opt: any) => 
      !selectedLots?.some((selected: any, sIndex: any) => 
        sIndex !== index && 
        selected.lotId === opt.value
      )
    ) || [];

    setCurrentLots(filteredLots);
  }, [JSON.stringify(selectedLots), dataOptions]);

  return (
    <div className={styles.multiselect}>
      <div className={styles.head}>
        <Controller
          name={`${parentName}[${index}].lotId`}
          control={control}
          rules={{ required: 'Партида е задължителна' }}
          render={({ field: { onChange, value } }) => (
            <div className={styles.select}>
              <label>Партида</label>
              <Select
                value={currentLots.find((opt: any) => opt.value === value) || null}
                onChange={(selectedOption) => onChange(selectedOption?.value || '')}
                options={currentLots}
                getOptionLabel={(opt: any) => opt.label}
                getOptionValue={(opt: any) => opt.value}
                isSearchable={true}
                placeholder="Избери партида..."
                className={classNames(styles.reactSelect, errors?.[parentName]?.[index]?.lotId ? styles.formFieldError : '')}
              />
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

        {/* Ново поле за ДДС на ниво продукт */}
        <div>
          <label>ДДС (%){isVatRegistered && <span className="text-red-500">*</span>}</label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            {...register(`${parentName}[${index}].vatRate`, {
              required: isVatRegistered ? 'ДДС е задължително за регистрирани по ДДС компании' : false,
              valueAsNumber: true,
            })}
            defaultValue={20}
            className={styles.quantity} // Или нов клас за стил
          />
        </div>
        {errors?.[parentName]?.[index]?.vatRate && (
          <p className={styles.frontEndErrors}>{errors[parentName][index].vatRate.message}</p>
        )}
      </div>

      <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
    </div>
  );
}