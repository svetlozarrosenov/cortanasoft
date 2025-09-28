'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './contacts.module.css';
import { fields } from './const';
import { Controller, useForm } from 'react-hook-form';
import IntroSecondary from '@/components/common/introSecondary';
import { contact } from './hooks';
import Shell from '@/components/shell';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contacts: React.FC = () => {
  const [backEndError, setBackEndError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });

  const onSubmit = async (data: any) => {
    console.log('crb_data', data);
    try {
      await contact({ ...data });
    } catch (e: any) {
      setBackEndError(e.message);
    }
  };

  return (
    <>
      <IntroSecondary data={{ title: 'Contact Us', content: 'Do you have questions or want to learn more about our CRM and ERP solutions? Our team and the AI ​​assistant Cortana are here to help you!' }} /> 

      <div className={styles.contact}>
        <Shell>
          {backEndError && <div className={styles.backEndError}>
              {backEndError}
          </div>}

          <div className={styles.head}>
          <div className={styles.summary}>
              <h4 className={styles.loginHead}>
                Our Contacts
              </h4>

              <p className={styles.loginText}>
                Fill up the form and our Team will get back to you within 24 hours.
              </p>

              <ul className={styles.features}>
                <li className={styles.feature}>
                  <FaEnvelope className={styles.featureIcon} />
                  <span>support@cortanasoft.com</span>
                </li>
                <li className={styles.feature}>
                  <FaPhone className={styles.featureIcon} />
                  <span>+359 87 664 9967</span>
                </li>
                <li className={styles.feature}>
                  <FaMapMarkerAlt className={styles.featureIcon} />
                  <span>10 Business Center Street, Sofia, Bulgaria</span>
                </li>
              </ul>
            </div>
      
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
                                className={styles.input}
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
                                  className={styles.textarea}
                                  rows={5}
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
                Send Message
              </button>
            </form>
          </div>
        </Shell>
      </div>
    </>
  );
};

export default Contacts;