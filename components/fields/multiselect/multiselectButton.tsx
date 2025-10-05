import classNames from 'classnames';
import React, { useState } from 'react';
import Select from 'react-select';
import styles from './multiselect.module.css';
import { FaTrash } from 'react-icons/fa';
import MultiSelect from './';

interface Option {
  value: string | number;
  label: string;
}

interface Product {
  productId: string;
  productBatchId: string;
  productName: string;
  quantity: number;
}

interface MultiSelectProps {
  options?: Option[];
  defaultValue?: Option[];
  onChange?: (selected: any) => any;
  errors: any;
  fields: any;
  ref: any;
}

export default function MultiSelectButton({ fields, errors, ref }: MultiSelectProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const handleOnClick = () => {
    setProducts([...products, {
      productId: '',
      productBatchId: '',
      productName: '',
      quantity: 0
    }]);
  };

  return (
    <>
        {products.map((product, index) => (
            <MultiSelect
            key={index}
            fields={fields}
            errors={errors}
            ref={ref}
            product={product}
            onProductChange={(idx: number, val: string) => {
                const updated = [...products];
                updated[idx].productId = val;
                updated[idx].productName = val; 
                setProducts(updated);
            }}
            onBatchChange={(idx: number, val: string) => {
                const updated = [...products];
                updated[idx].productBatchId = val;
                setProducts(updated);
            }}
            onQuantityChange={(idx: number, val: number) => {
                const updated = [...products];
                updated[idx].quantity = val;
                setProducts(updated);
            }}
            onDelete={(idx: number) => {
                const updated = products.filter((_, i) => i !== idx);
                setProducts(updated);
            }}
            />
        ))}

        <button onClick={handleOnClick}>Добави</button>
    </>
  );
}