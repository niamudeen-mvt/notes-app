import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../../utils/axios';
import { setDataIntoLc } from '../../utils/helper';
import { _config } from '../../constants';
import { sendNotification } from '../../utils/notifications';
import { signInWithGooglePopup } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignInButton() {
   const navigate = useNavigate();

   const { mutate: authGoogle } = useMutation({
      mutationFn: async (payload) => {
         const response = await axiosInstance.post('/auth/google', payload);
         return response?.data || {};
      },
      onError: (error) => {
         console.log('error: ', error);
      },
      onSuccess: (data) => {
         const { userId, access_token } = data;
         if (!userId || !access_token) return;
         setDataIntoLc('access_token', access_token);
         setDataIntoLc('user_id', userId);
         navigate(_config.REDIRECT.LOGIN_SUCCESS, { replace: true });
         sendNotification('success', 'User logged in successfully');
      },
   });

   const logGoogleUser = async () => {
      try {
         const response = await signInWithGooglePopup();

         const { email, displayName } = response;

         if (!email || !displayName) return;

         authGoogle({ email, username: displayName });
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div>
         <button
            type="button"
            onClick={logGoogleUser}
            className="btn w-full !bg-white !text-black shadow-lg flex items-center justify-center gap-2"
         >
            <FcGoogle size={22} />
            Sign in with Google
         </button>
      </div>
   );
}
