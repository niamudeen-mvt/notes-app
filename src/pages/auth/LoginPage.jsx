import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { _config, FormInputsList } from '../../constants';

import FormFieldError from '../../components/shared/FormFieldError';
import FormBottomText from '../../components/shared/FormBottomText';
import BasicFormLayout from '../../components/shared/BasicFormLayout';

import axiosInstance from '../../utils/axios';
import { setDataIntoLc } from '../../utils/helper';
import { sendNotification } from '../../utils/notifications';

export default function LoginPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const LoginFormInputsList =
      (FormInputsList && FormInputsList.filter((input) => input.isLogin)) || [];

   const navigate = useNavigate();

   const { isPending: isFormSubmitting, mutate } = useMutation({
      mutationFn: async (payload) => {
         const response = await axiosInstance.post('/auth/login', payload);
         return response?.data || {};
      },
      onSuccess: (data) => {
         const { userId, access_token } = data;

         if (!userId || !access_token) return;
         setDataIntoLc('access_token', access_token);
         setDataIntoLc('user_id', userId);
         navigate(_config.REDIRECT.LOGIN_SUCCESS, { replace: true });
         sendNotification('success', 'User logged in successfully');
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
               <h2>Sign in</h2>

               <div className="space-y-8">
                  {LoginFormInputsList?.map((input) => (
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

               <div className="space-y-2">
                  <Link to="/forgot-password" className="cursor-pointer">
                     <p className="text-main_clr">Forgot password ?</p>
                  </Link>

                  <FormBottomText
                     text="Not registered yet ?"
                     link="/signup"
                     linkText="Create an account"
                  />
               </div>
            </div>
         </form>
      </BasicFormLayout>
   );
}
