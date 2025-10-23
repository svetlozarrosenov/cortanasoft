import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import styles from '../multiselect/multiselect.module.css';
import classNames from 'classnames';
import { formatPrice } from '@/utils/helpers';

const addPercent = (number: number, percentage: number) => {
  const percent = percentage / 100;
  const result = number + (number * percent);
  return result;
}

export default function MultiSelect({ control, parentName, index, dataOptions, errors, onDelete, isVatRegistered, currencyOptions, company }: any): any {
  const { setValue, watch, register } = useFormContext();
  const selectedLots = watch(parentName);
  const [currentLots, setCurrentLots] = useState<any>([]);
  const [total, setTotal] = useState(0);
  
  const lotValue = watch(`${parentName}[${index}].lotId`);
  const selectedCurrencyId = watch(`${parentName}[${index}].currencyId`);
  const currentPrice = watch(`${parentName}[${index}].productPrice`);
  const currentCurrencyRate = watch(`${parentName}[${index}].currencyRate`);
  const currenetQuantity =  watch(`${parentName}[${index}].quantity`);
  const currenetVat =  watch(`${parentName}[${index}].vatRate`);
  
  const isDifferentCurrency = selectedCurrencyId && selectedCurrencyId !== company.currencyId;

  useEffect(() => {
    let price = currentPrice * currenetQuantity;

    if(currentCurrencyRate && isDifferentCurrency) {
      price = price * currentCurrencyRate;
    }

    if(currenetVat) {
      price = addPercent(price, currenetVat);
    }

    if (!isNaN(price)) {
      setTotal(price);
      setValue(`${parentName}[${index}].totalProductPrice`, price);
    }
  }, [currentPrice, currentCurrencyRate, currenetVat, currenetQuantity, isDifferentCurrency]);

  useEffect(() => {
    const filteredLots = dataOptions?.filter((opt: any) => 
      !selectedLots?.some((selected: any, sIndex: any) => 
        sIndex !== index && 
        selected.lotId === opt.value
      )
    ) || [];

    setCurrentLots(filteredLots);
  }, [JSON.stringify(selectedLots), dataOptions]);

  useEffect(() => {
    if (company?.currencyId && !watch(`${parentName}[${index}].currencyId`)) {
      setValue(`${parentName}[${index}].currencyId`, company.currencyId);
    }
  }, [company?.currencyId, watch, setValue, parentName, index]);
  
  const vatOptions = [
    { value: 0, label: '0%' },
    { value: 9, label: '9%' },
    { value: 10, label: '10%' },
    { value: 20, label: '20%' }
  ];

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
        {/* Ново поле за цена */}
        <div>
          <label>Цена<span className="text-red-500">*</span></label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            {...register(`${parentName}[${index}].productPrice`, {
              required: 'Цена е задължителна',
              min: { value: 0.01, message: 'Минимална цена 0.01' },
              valueAsNumber: true,
            })}
            className={styles.quantity}
          />
        </div>
        {errors?.[parentName]?.[index]?.price && (
          <p className={styles.frontEndErrors}>{errors[parentName][index].price.message}</p>
        )}

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

        {/* ДДС като select */}
        <div>
          <label>ДДС (%){isVatRegistered && <span className="text-red-500">*</span>}</label>
          <Controller
            name={`${parentName}[${index}].vatRate`}
            control={control}
            rules={{
              required: isVatRegistered ? 'ДДС е задължително за регистрирани по ДДС компании' : false,
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                value={vatOptions.find((opt) => opt.value === value) || vatOptions[3]} // Дефолт 20%
                onChange={(selectedOption) => onChange(selectedOption?.value || 0)}
                options={vatOptions}
                getOptionLabel={(opt: any) => opt.label}
                getOptionValue={(opt: any) => opt.value}
                isSearchable={false}
                placeholder="Избери ДДС..."
                className={classNames(styles.reactSelect, errors?.[parentName]?.[index]?.vatRate ? styles.formFieldError : '')}
              />
            )}
          />
        </div>
        {errors?.[parentName]?.[index]?.vatRate && (
          <p className={styles.frontEndErrors}>{errors[parentName][index].vatRate.message}</p>
        )}
      </div>

      <div className={styles.currencyField}> {/* Добави клас в CSS */}
        <label>Валута<span className="text-red-500">*</span></label>
        <Controller
          name={`${parentName}[${index}].currencyId`}
          control={control}
          rules={{ required: 'Валута е задължителна' }}
          render={({ field: { onChange, value } }) => {
            return (
            <Select
              value={currencyOptions.find((opt: any) => opt.value === value) || null}
              onChange={(selectedOption) => onChange(selectedOption?.value || '')}
              options={currencyOptions}
              getOptionLabel={(opt: any) => opt.label}
              getOptionValue={(opt: any) => opt.value}
              isSearchable={true}
              placeholder="Избери валута..."
              className={classNames(styles.reactSelect, errors?.currencyId ? styles.formFieldError : '')}
            />
          )}}
        />
        {errors?.currencyId && <p className={styles.frontEndErrors}>{errors.currencyId.message}</p>}
      </div>
      
      {isDifferentCurrency && <div className={styles.currencyField}>
        <label>Валутен курс<span className="text-red-500">*</span></label>
        <Controller
          name={`${parentName}[${index}].currencyRate`}
          control={control}
          rules={{ required: 'Валутен курс е задължителен' }}
          render={({ field: { onChange, value } }) => (
            <input
              placeholder="Въведи курс"
              className={classNames(styles.quantity)}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
        {errors?.currencyId && <p className={styles.frontEndErrors}>{errors.currencyId.message}</p>}
      </div>}
      
      <p>Крайна цена с {currenetVat}% ДДС: {formatPrice(total, company.currency)}</p>
      
      <button onClick={onDelete}><FaTrash className={styles.icon} /><span>Изтрий</span></button>
    </div>
  );
}