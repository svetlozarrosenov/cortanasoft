'use client';

import { Controller } from 'react-hook-form';
import { FieldsConfig } from '@/app/dashboard/tasks/const';

interface DynamicFormProps {
  fields: FieldsConfig;
  form: any;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
  backEndError: string | null;
  onClose: () => void; // Added prop for closing the form
}

export default function DynamicForm({ fields, form, onSubmit, backEndError, onClose }: DynamicFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30 z-50">
      <div className="relative max-w-lg w-full mx-4 p-6 bg-white shadow-md rounded-lg">
        <button
          type="button"
          onClick={() => {
            form.reset();
            onClose()
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Затвори"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

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
                          type="text"
                          id={fields[key].name}
                          placeholder={fields[key].placeholder}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          ref={ref}
                          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 ${
                            errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                          }`}
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
                          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 ${
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
                          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 ${
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
                          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
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
                          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 ${
                            errors[fields[key].name] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      );
                    default:
                      return <></>;
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
    </div>
  );
}