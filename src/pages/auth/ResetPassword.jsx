import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { FormInputsList } from '../../constants';

import FormFieldError from '../../components/shared/FormFieldError';
import BasicFormLayout from '../../components/shared/BasicFormLayout';

import axiosInstance from '../../utils/axios';
import { sendNotification } from '../../utils/notifications';

export default function ResetPassword() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const { token } = useParams();

   const ResetPasswordInputs =
      (FormInputsList &&
         FormInputsList.filter((input) => input.isResetPassword)) ||
      [];

   const navigate = useNavigate();

   const { isPending: isFormSubmitting, mutate } = useMutation({
      mutationFn: async (payload) => {
         const response = await axiosInstance.post(
            `/auth/reset-password/${token}`,
            payload
         );

         return response?.data || {};
      },
      onSuccess: (data) => {
         sendNotification('success', 'Password reset successfully');
         reset();
         navigate('/login', { replace: true });
      },
      onError: (error) => {
         console.log('error: ', error);
         if (error?.response?.data?.message) {
            sendNotification('error', error?.response?.data?.message);
         }
      },
   });

   const onSubmit = (data) => {
      if (!data) return;

      if (data.password !== data.confirmPassword) {
         sendNotification('error', 'Password and confirm password not matched');
         return;
      }
      mutate(data);
   };

   const resetPasswordFields = [
      {
         name: 'password',
         placeholder: 'New Password',
         type: 'password',
      },
      {
         name: 'confirmPassword',
         placeholder: 'Confirm Password',
         type: 'password',
      },
   ];

   return (
      <BasicFormLayout>
         <form
            className="custom_form flex_center"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="space-y-8">
               <h2>Reset Password</h2>

               <div className="space-y-8">
                  {resetPasswordFields?.map((input) => (
                     <div key={input.name} className="space-y-2">
                        <div className="flex items-center gap-3 py-2 border-b">
                           <span>{ResetPasswordInputs[0].icon}</span>
                           <input
                              type={input.type || 'text'}
                              {...register(
                                 input.name,
                                 ResetPasswordInputs[0].rules
                              )}
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
            </div>
         </form>
      </BasicFormLayout>
   );
}
