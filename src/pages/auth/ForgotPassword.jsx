import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { FormInputsList } from '../../constants';

import FormFieldError from '../../components/shared/FormFieldError';
import BasicFormLayout from '../../components/shared/BasicFormLayout';

import axiosInstance from '../../utils/axios';
import { sendNotification } from '../../utils/notifications';

export default function ForgotPassword() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const ForgotPasswordInputs =
      (FormInputsList &&
         FormInputsList.filter((input) => input.isForgotPassword)) ||
      [];

   const { isPending: isFormSubmitting, mutate } = useMutation({
      mutationFn: async (payload) => {
         const response = await axiosInstance.post(
            '/auth/forgot-password',
            payload
         );
         return response?.data || {};
      },
      onSuccess: (data) => {
         sendNotification('success', 'Password reset link sent to your email');
         reset();
      },
      onError: (error) => {
         console.log('error: ', error);
         if (error?.response?.data?.message) {
            sendNotification('error', error?.response?.data?.message);
         }
      },
   });

   const onSubmit = (data) => {
      console.log('data: ', data);
      if (!data) return;

      mutate(data);
   };

   return (
      <BasicFormLayout>
         <form
            className="custom_form flex_center"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="space-y-8">
               <h2>Forgot Password</h2>

               <div className="space-y-8">
                  {ForgotPasswordInputs?.map((input) => (
                     <div key={input.name} className="space-y-2">
                        <div className="flex items-center gap-3 py-2 border-b">
                           <span>{input.icon}</span>
                           <input
                              type={input.type || 'text'}
                              {...register(input.name, input.rules)}
                              autoComplete="off"
                              placeholder={input.placeholder || ''}
                           />
                        </div>
                        {errors[input.name] && (
                           <FormFieldError
                              message={errors[input.name].message}
                           />
                        )}
                     </div>
                  ))}
               </div>
               <button
                  type="submit"
                  className="btn w-full"
                  disabled={isFormSubmitting}
               >
                  {isFormSubmitting ? 'Loading...' : 'Submit'}
               </button>
               <div>
                  <Link to="/login" className="cursor-pointer">
                     <p className="text-main_clr">Back to login ?</p>
                  </Link>
               </div>
            </div>
         </form>
      </BasicFormLayout>
   );
}
