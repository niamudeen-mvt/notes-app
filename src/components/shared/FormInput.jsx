import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import FormFieldError from './FormFieldError';

export default function FormInput({ input }) {
   console.log('input: ', input);

   return (
      <div>
         <label className="capitalize text-sm">{input.label}</label>
         <input
            {...register(input.name, input.rules)}
            autoComplete="off"
            className="custom_input"
         />
         {errors[input.name] && (
            <FormFieldError message={errors[input.name].message} />
         )}
      </div>
   );
}
