'use client';
import React, { useState } from 'react';
import { useAuth } from './hooks';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { fields } from './const';
import { Controller, useForm } from 'react-hook-form';
import IntroSecondary from '@/components/common/introSecondary';

const Login: React.FC = () => {
  const { user } = useAuth();
  const { login } = useAuth();
  const [backEndError, setBackEndError] = useState('');
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });

  const onSubmit = async (data: any) => {
    console.log('crb_data', data);
    try {
      await login({ ...data });
      router.push('/dashboard');
    } catch (e: any) {
      setBackEndError(e.message);
    }
  };

  return (
    <>
      <IntroSecondary data={{ title: 'Login Page', content: '' }} /> 

      <div className={styles.login}>
        <h4 className={styles.loginHead}>
          Hi, Welcome back!
        </h4>

        <p className={styles.loginText}>
          Login to your account to enjoy
        </p>

        {backEndError && <div className={styles.backEndError}>
          {backEndError}
        </div>}
  
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {Object.keys(fields).map((key) => (
            <div key={fields[key].name}>
              <label htmlFor={fields[key].name}>
                {fields[key].label}
                {fields[key].required && <span>*</span>}
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
                    case 'password':
                      return (
                        <input
                          type="password"
                          id={fields[key].name}
                          placeholder={fields[key].placeholder}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          ref={ref}
                          className={styles.input}
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
                          className={styles.input}
                        />
                      );
                    default:
                      return <></>;
                  }
                }}
              />

              {errors[fields[key].name] && (
                <p>{errors[fields[key].name]?.message as any}</p>
              )}
            </div>
          ))}

          <button
            className={styles.button}
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;