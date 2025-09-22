'use client';

import { Controller } from 'react-hook-form';
import { FieldsConfig } from '@/app/dashboard/tasks/const';

interface DynamicFormProps {
  fields: FieldsConfig;
  form: any;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
  backEndError: string | null;
}

export default function DynamicForm({ fields, form, onSubmit, backEndError }: DynamicFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Back-end грешки */}
      {backEndError && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          {backEndError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(fields).map((key) => (
          <div key={fields[key].name} className="flex flex-col">
            <label htmlFor={fields[key].name} className="mb-1 text-sm font-medium text-gray-700">
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
                        type="text" // Поправено: input вместо textarea
                        id={fields[key].name}
                        placeholder={fields[key].placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        ref={ref}
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                        }`}
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
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                        }`}
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
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                        }`}
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
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                          errors[fields[key].name] ? 'border-red-500' : ''
                        }`}
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
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>{option.label}</span>
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
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    );
                  default:
                    return (
                      <input
                        type={fields[key].type}
                        id={fields[key].name}
                        placeholder={fields[key].placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        ref={ref}
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    );
                }
              }}
            />

            {errors[fields[key].name] && (
              <p className="mt-1 text-sm text-red-500">{errors[fields[key].name]?.message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Изпрати
        </button>
      </form>
    </div>
  );
}