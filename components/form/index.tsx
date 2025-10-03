'use client';
import { createPortal } from 'react-dom';
import styles from './form.module.css';
import { Controller } from 'react-hook-form';
import { FieldsConfig } from '@/app/dashboard/tasks/const';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

interface DynamicFormProps {
  fields: FieldsConfig;
  form: any;
  title: string;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
  backEndError: string | null;
  onClose: () => void;
}

export default function DynamicForm({ fields, form, onSubmit, backEndError, onClose, title }: DynamicFormProps) {
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

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {Object.keys(fields).map((key) => (
            <div key={fields[key].name} className={styles.formInner}>
              <label htmlFor={fields[key].name} className={styles.label}>
                {fields[key].label}
                {fields[key].required && <span className="text-red-500">*</span>}
              </label>

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
                      );
                    case 'email':
                      return (
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
                      );
                    case 'textarea':
                      return (
                        <textarea
                          id={fields[key].name}
                          placeholder={fields[key].placeholder}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          ref={ref}
                          className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                        />
                      );
                    case 'select':
                      return (
                        <select
                          id={fields[key].name}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          ref={ref}
                          className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                        >
                          <option value="" disabled>
                            Избери...
                          </option>
                          {fields[key].options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      );
                    case 'checkbox':
                      return (
                        <input
                          type="checkbox"
                          id={fields[key].name}
                          onChange={(e) => onChange(e.target.checked)}
                          onBlur={onBlur}
                          checked={value || false}
                          ref={ref}
                          className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                        />
                      );
                    case 'radio':
                      return (
                        <div className="flex space-x-4">
                          {fields[key].options?.map((option) => (
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
                      );
                    case 'datetime-local':
                      return (
                        <input
                          type="datetime-local"
                          id={fields[key].name}
                          placeholder={fields[key].placeholder}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          ref={ref}
                          className={classNames(styles.formField, errors[fields[key].name] ? styles.formFieldError : '')}
                        />
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
          ))}

          <button
            type="submit"
            className={styles.buttonSubmit}
          >
            Запази
          </button>
        </form>
      </div>
    </div>),
    document.body
  );
}