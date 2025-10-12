import { useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from './index';

export default function MultiSelectButton({ control, name, lotsOptions, productOptions, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = () => {
    append({ 
      id: uuidv4(),
      product: '', 
      lotId: '', 
      quantity: 0 
    });
  };

  return (
    <>
      {fields.map((field, index) => (
        <MultiSelect
          key={field.id}
          control={control}
          parentName={name}
          index={index}
          lotOptions={lotsOptions}
          productOptions={productOptions || []}
          errors={errors}
          onDelete={() => remove(index)}
        />
      ))}

      <button type="button" onClick={handleAdd}>Добави</button>
    </>
  );
}