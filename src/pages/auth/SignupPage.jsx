import { useForm } from 'react-hook-form';
import { _config, FormInputsList } from '../../constants';
import FormFieldError from '../../components/shared/FormFieldError';
import FormBottomText from '../../components/shared/FormBottomText';
import BasicFormLayout from '../../components/shared/BasicFormLayout';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { sendNotification } from '../../utils/notifications';
// import GoogleSignInButton from '../../components/shared/GoogleSignInButton';

export default function SignupPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const SignupFormInputsList =
      (FormInputsList && FormInputsList.filter((input) => input.isSignup)) ||
      [];

   const navigate = useNavigate();

   const { isPending: isFormSubmitting, mutate } = useMutation({
      mutationFn: async (payload) => {
         const response = await axiosInstance.post('/auth/register', payload);
         return response?.data || {};
      },
      onSuccess: () => {
         sendNotification('success', 'User registerd successfully');
         navigate(_config.REDIRECT.SIGNUP_SUCCESS, { replace: true });
         reset();
      },
      onError: (error) => {
         if (error?.response?.data?.message) {
            sendNotification('warning', error?.response?.data?.message);
         }
         console.log('error: ', error);
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
            {' '}
            <div className="space-y-8">
               <h2>Sign up</h2>

               <div className="space-y-8">
                  {SignupFormInputsList?.map((input) => (
                     <div key={input.name} className="space-y-2">
                        <div className="flex items-center gap-3 py-2 border-b">
                           <span>{input.icon}</span>
                           <input
                              {...register(input.name, input.rules)}
                              autoComplete="off"
                              placeholder={input.placeholder || ''}
                              type={input.type || 'text'}
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

               {/* <GoogleSignInButton /> */}

               <FormBottomText
                  text="Already have an account ?"
                  link="/login"
                  linkText="Sign in"
               />
            </div>
         </form>
      </BasicFormLayout>
   );
}
