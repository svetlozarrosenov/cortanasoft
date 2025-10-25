import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import styles from './multiselectFields.module.css';
import classNames from 'classnames';
import { formatPrice } from '@/utils/helpers';

const addPercent = (number: number, percentage: number) => {
  const percent = percentage / 100;
  const result = number + (number * percent);
  return result;
}

const removePercent = (result: number, percentage: number) => {
  const percent = percentage / 100;
  const original = result / (1 + percent);
  return original;
};

export default function MultiSelect({ control, parentName, index, dataOptions, errors, onDelete, isVatRegistered, currencyOptions, company }: any): any {
  const { setValue, watch, register } = useFormContext();
  const selectedProducts = watch(parentName);
  const [currentProducts, setcurrentProducts] = useState<any>([]);
  const [total, setTotal] = useState(0);
  
  const productValue = watch(`${parentName}[${index}].productId`);
  const selectedCurrencyId = watch(`${parentName}[${index}].currencyId`);
  const currentPrice = watch(`${parentName}[${index}].costPrice`);
  const currentCurrencyRate = watch(`${parentName}[${index}].currencyRate`);
  const currenetQuantity =  watch(`${parentName}[${index}].quantity`);
  const currenetVat =  watch(`${parentName}[${index}].vatRate`);
  const [selectedCurrency, setSelectedCurrency] = useState(company?.currency)

  const isDifferentCurrency = selectedCurrencyId && selectedCurrencyId !== company.currencyId;

  useEffect(() => {
    setValue(`${parentName}[${index}].currencyRate`, 0);
    selectedCurrencyId
    setSelectedCurrency(currencyOptions.find((options: any) => options.value === selectedCurrencyId))
  }, [selectedCurrencyId])

  useEffect(() => {
    const currentProduct = dataOptions.find((product: any) => product._id === productValue)
    setValue(`${parentName}[${index}].costPrice`, currentProduct?.costPrice);
  }, [productValue]);

  useEffect(() => {
    let price = currentPrice;
    if(currentCurrencyRate && isDifferentCurrency) {
      price = currentPrice * currentCurrencyRate;
    }

    price = price * currenetQuantity;

    // if(currenetVat) {
    //   price = removePercent(price, currenetVat);
    // }

    if (!isNaN(price)) {
      setTotal(price);
      setValue(`${parentName}[${index}].totalCostPrice`, price);
    }
  }, [currentPrice, currentCurrencyRate, currenetVat, currenetQuantity, isDifferentCurrency]);

  useEffect(() => {
    const filteredProducts = dataOptions?.filter((opt: any) => 
      !selectedProducts?.some((selected: any, sIndex: any) => 
        sIndex !== index && 
        selected.productId === opt.value
      )
    ) || [];

    setcurrentProducts(filteredProducts);
  }, [JSON.stringify(selectedProducts), dataOptions]);

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
          name={`${parentName}[${index}].productId`}
          control={control}
          rules={{ required: 'Продукт е задължително поле' }}
          render={({ field: { onChange, value } }) => (
            <div className={styles.select}>
              <label>Продукт</label>
              <Select
                value={currentProducts.find((opt: any) => opt.value === value) || null}
                onChange={(selectedOption) => onChange(selectedOption?.value || '')}
                options={currentProducts}
                getOptionLabel={(opt: any) => opt.label}
                getOptionValue={(opt: any) => opt.value}
                isSearchable={true}
                placeholder="Избери продукт..."
                className={classNames(styles.reactSelect, errors?.[parentName]?.[index]?.productId ? styles.formFieldError : '')}
              />
              {errors?.[parentName]?.[index]?.productId && (
                <p className={styles.frontEndErrors}>{errors[parentName][index].productId.message}</p>
              )}
            </div>
          )}
        />

        <div>
          <Controller
            name={`${parentName}[${index}].costPrice`}
            control={control}
            rules={{
              required: 'Цена е задължителна',
              min: { value: 0.01, message: 'Минимална цена 0.01' },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <div>
                <label>Цена в {selectedCurrency.code}<span className="text-red-500">*</span></label>
                <input
                  disabled={!productValue}
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={value ?? ''}
                  onChange={onChange}
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

        <Controller
          name={`${parentName}[${index}].quantity`}
          control={control}
          rules={{ required: 'Количество е задължително', min: { value: 1, message: 'Минимум 1' } }}
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <label>Брой</label>
              <input
                disabled={!productValue}
                value={value ?? ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '') {
                    onChange(1);
                    return;
                  }
                  const newQuantity = parseInt(inputValue, 10);
                  if (isNaN(newQuantity)) {
                    onChange(1);
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
          name={`${parentName}[${index}].expiryDate`}
          control={control}
          rules={{}}
          render={({ field: { onChange, value } }) => (
            <div>
              <label>Срок на годност до:</label>
              <input
                type="date"
                value={value || ''}
                onChange={onChange}
                className={styles.quantity}
              />
            </div>
          )}
        />

        <Controller
          name={`${parentName}[${index}].serialNumber`}
          control={control}
          rules={{}}
          render={({ field: { onChange, value } }) => (
            <div>
              <label>Сериен номер</label>
              <input
                type="text"
                value={value || ''}
                onChange={onChange}
                className={styles.quantity}
              />
            </div>
          )}
        />

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

        <FaTrash onClick={onDelete} className={styles.icon} />
      </div>
      <div className={styles.total}>
        <p>Крайна цена с ДДС за брой: {formatPrice(currentPrice, selectedCurrency.code)}</p>
        {company.currency != selectedCurrency.code && <p>Крайна цена с ДДС за брой в {company?.currency}: {formatPrice(currentPrice * currentCurrencyRate, company.currency)}</p>}
        <p>| {currenetVat}% ДДС: {formatPrice(total - removePercent(total, currenetVat), company.currency)}</p>
        <p>| Крайна Цена без ДДС:{formatPrice(removePercent(total, currenetVat), company.currency)}</p>
        <p>| Крайна цена {formatPrice(total, company.currency)}</p>
      </div>
    </div>
  );
}