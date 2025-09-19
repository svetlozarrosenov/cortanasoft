import React, { useState } from 'react';
import Select from 'react-select';

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  defaultValue?: Option[];
  onChange?: (selected: any) => any;
}

export default function MultiSelect({ options, defaultValue = [], onChange }: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<Option[]>(defaultValue);

  const handleChange = (selectedOptions: any) => {
    setSelectedValues(selectedOptions || []);
    if (onChange) {
      onChange(selectedOptions || []);
    }
  };

  // Персонализирани стилове за react-select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f9fafb' : '#ffffff',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      color: '#1f2937',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#ffffff',
      color: '#1f2937',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e5e7eb' : '#ffffff',
      color: '#1f2937',
      '&:hover': {
        backgroundColor: '#d1d5db',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#e5e7eb',
      color: '#1f2937',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#1f2937',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#1f2937',
      '&:hover': {
        backgroundColor: '#dc2626',
        color: '#ffffff',
      },
    }),
    // Стилове за тъмен режим
    controlDark: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#374151' : '#1f2937',
      borderColor: state.isFocused ? '#3b82f6' : '#4b5563',
      color: '#f9fafb',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menuDark: (provided: any) => ({
      ...provided,
      backgroundColor: '#1f2937',
      color: '#f9fafb',
    }),
    optionDark: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4b5563' : '#1f2937',
      color: '#f9fafb',
      '&:hover': {
        backgroundColor: '#6b7280',
      },
    }),
    multiValueDark: (provided: any) => ({
      ...provided,
      backgroundColor: '#4b5563',
      color: '#f9fafb',
    }),
    multiValueLabelDark: (provided: any) => ({
      ...provided,
      color: '#f9fafb',
    }),
    multiValueRemoveDark: (provided: any) => ({
      ...provided,
      color: '#f9fafb',
      '&:hover': {
        backgroundColor: '#dc2626',
        color: '#ffffff',
      },
    }),
  };

  return (
    <Select
      isMulti
      name="colors"
      options={options}
      value={selectedValues}
      onChange={handleChange}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={{
        control: (provided, state) =>
          document.documentElement.classList.contains('dark')
            ? customStyles.controlDark(provided, state)
            : customStyles.control(provided, state),
        menu: (provided) =>
          document.documentElement.classList.contains('dark')
            ? customStyles.menuDark(provided)
            : customStyles.menu(provided),
        option: (provided, state) =>
          document.documentElement.classList.contains('dark')
            ? customStyles.optionDark(provided, state)
            : customStyles.option(provided, state),
        multiValue: (provided) =>
          document.documentElement.classList.contains('dark')
            ? customStyles.multiValueDark(provided)
            : customStyles.multiValue(provided),
        multiValueLabel: (provided) =>
          document.documentElement.classList.contains('dark')
            ? customStyles.multiValueLabelDark(provided)
            : customStyles.multiValueLabel(provided),
        multiValueRemove: (provided) =>
          document.documentElement.classList.contains('dark')
            ? customStyles.multiValueRemoveDark(provided)
            : customStyles.multiValueRemove(provided),
      }}
    />
  );
}