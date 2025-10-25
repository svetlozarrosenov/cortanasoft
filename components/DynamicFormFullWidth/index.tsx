'use client';
import { createPortal } from 'react-dom';
import styles from './form.module.css';
import { Controller, FormProvider } from 'react-hook-form';
import { FieldsConfig } from '@/app/dashboard/tasks/const';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import MultiSelectButton from '../fields/multiselect/multiselectButton';
import MultiSelectSecondaryButton from '../fields/MultiselectSecondary/MultiselectSecondaryButton';

interface DynamicFormProps {
  fields: FieldsConfig;
  form: any;
  title: string;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
  backEndError: string | null;
  onClose: () => void;
}

export default function DynamicFormFullWidth({ fields, form, onSubmit, backEndError, onClose, title }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = form;

  return createPortal (
    (<div className={styles.formContainer}>
      <div className={styles.overlay}></div>
      
      <div className={styles.formContainerInner}>
        <h2 className={styles.formTitle}>{title}</h2>

        <AiOutlineClose onClick={() => {
            reset();
            onClose()
          }}
          className={styles.buttonX}
          aria-label="Затвори"
        />

        {backEndError && (
          <div className={styles.backEndError}>
            {backEndError}
          </div>
        )}

        <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {Object.keys(fields).map((key, index) => {
            return (
              <div key={index} className={styles.formInner}>
                <Controller
                  name={fields[key].name}
                  control={control}
                  rules={{
                    required: fields[key].required ? `${fields[key].label} е задължително` : false,
                    pattern: fields[key].pattern
                      ? { value: fields[key].pattern, message: `Невалиден формат за ${fields[key].label}` }
                      : undefined,
                    min: fields[key].min !== undefined
                      ? { value: fields[key].min, message: `Минимална стойност е ${fields[key].min}` }
                      : undefined,
                    max: fields[key].max !== undefined
                      ? { value: fields[key].max, message: `Максимална стойност е ${fields[key].max}` }
                      : undefined,
                    minLength: fields[key].minLength
                      ? { value: fields[key].minLength, message: `Минимум ${fields[key].minLength} символа` }
                      : undefined,
                    maxLength: fields[key].maxLength
                      ? { value: fields[key].maxLength, message: `Максимум ${fields[key].maxLength} символа` }
                      : undefined,
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    switch (fields[key].type) {
                      case 'text':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="text"
                              id={fields[key].name}
                              placeholder={fields[key].placeholder}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value || ''}
                              ref={ref}
                              className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                            />
                          </>
                        );
                      case 'email':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="email"
                              id={fields[key].name}
                              placeholder={fields[key].placeholder}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value || ''}
                              ref={ref}
                              className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                            />
                          </>
                        );
                      case 'textarea':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                              id={fields[key].name}
                              placeholder={fields[key].placeholder}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value || ''}
                              ref={ref}
                              className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                            />
                          </>
                        );
                      case 'select':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <select
                              id={fields[key].name}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value || fields[key].defaultValue || ''}
                              ref={ref}
                              className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                            >
                              <option value="" disabled>
                                Избери...
                              </option>
                              {fields[key].options?.map((option: any) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </>
                        );
                        case 'multiselect':
                          return (
                            <>
                              <label 
                                htmlFor={fields[key].name} 
                                className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                              >
                                {fields[key].label}
                                {fields[key].required && <span className="text-red-500">*</span>}
                              </label>
                        
                              <MultiSelectButton 
                                control={control}
                                name={fields[key].name}
                                productOptions={fields[key]?.productOptions}
                                dataOptions={fields[key]?.dataOptions}
                                errors={errors}
                              />
                            </>
                          );
                          case 'multiselectSecondary':
                            return (
                              <>
                                <label 
                                  htmlFor={fields[key].name} 
                                  className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                                >
                                  {fields[key].label}
                                  {fields[key].required && <span className="text-red-500">*</span>}
                                </label>
                          
                                <MultiSelectSecondaryButton 
                                   control={control}
                                   name={fields[key].name}
                                   filterOptions={fields[key]?.filterOptions}
                                   dataOptions={fields[key]?.dataOptions}
                                   currencyOptions={fields[key]?.currencyOptions}
                                   errors={errors}
                                   company={fields[key]?.company}
                                />
                              </>
                            );
                      case 'checkbox':
                        return (
                          <div className={styles.checkboxWrapper}>
                            <input
                              type="checkbox"
                              id={fields[key].name}
                              onChange={(e) => onChange(e.target.checked)}
                              onBlur={onBlur}
                              checked={value || false}
                              ref={ref}
                              className={classNames(styles.checkbox, errors[fields[key].name] ? styles.formFieldError : '')}
                            />
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.checkboxLabel, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                          </div>
                        );
                      case 'radio':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="flex space-x-4">
                              {fields[key].options?.map((option: any) => (
                                <label key={option.value} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name={fields[key].name}
                                    value={option.value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    checked={value === option.value}
                                    ref={ref}
                                    className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                                  />
                                  <span className="text-gray-800">{option.label}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        );
                      case 'datetime-local':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="datetime-local"
                              id={fields[key].name}
                              placeholder={fields[key].placeholder}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value || fields[key].defaultValue || ''}
                              ref={ref}
                              className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                            />
                          </>
                        );
                      case 'number':
                        return (
                          <>
                            <label 
                              htmlFor={fields[key].name} 
                              className={classNames(styles.label, errors[fields[key].name] ? styles.labelError : '')}
                            >
                              {fields[key].label}
                              {fields[key].required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="number"
                              id={fields[key].name}
                              placeholder={fields[key].placeholder}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value || ''}
                              ref={ref}
                              step={fields[key].step || 'any'} // За цена: step='0.01' в fields
                              min={fields[key].min}
                              max={fields[key].max}
                              className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                            />
                          </>
                        );
                      default:
                        return <></>;
                    }
                  }}
                />

                {errors[fields[key].name] && (
                  <p className={styles.frontEndErrors}>{errors[fields[key].name]?.message}</p>
                )}
              </div>
            )})}

          <button
            type="submit"
            className={styles.buttonSubmit}
          >
            Запази
          </button>
        </form>
        </FormProvider>
      </div>
    </div>),
    document.body
  );
}