import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInputsList } from '../constants';
import axiosInstance from '../utils/axios';
import { sendNotification } from '../utils/notifications';
import { useDispatch } from 'react-redux';
import { updateAuthUser } from '../store/features/authSlice';
import { getDataFromLc } from '../utils/helper';

export default function useProfile() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm();

   // const user = auth?.currentUser;
   // console.log(user);

   // const { mutate: authGoogle } = useMutation({
   //    mutationFn: async () => {
   //       const response = await axiosInstance.post(`/auth/google`, {
   //          email: user?.email,
   //          username: user?.displayName,
   //       });
   //       return response?.data?.userId || null;
   //    },
   //    onSuccess: (userId) => {
   //       console.log(userId);
   //       setDataIntoLc('user_id', userId);
   //    },
   // });

   // useEffect(() => {
   //    authGoogle();
   // }, [user?.email]);

   const [isEditToggleActive, setIsEditToggleActive] = useState(false);
   const [file, setFile] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);

   const handleProfileImage = (event) => {
      if (!event.target.files[0]) return;
      setFile(event.target.files[0]);

      const url = URL.createObjectURL(event.target.files[0]);
      setThumbnail(url);
   };

   const queryClient = useQueryClient();
   const dispatch = useDispatch();

   // form inputs
   const ProfileFormInputsList =
      (FormInputsList && FormInputsList.filter((input) => input.isProfile)) ||
      [];

   const userId = getDataFromLc('user_id');

   // fetching user details
   const { data: authUser, isSuccess } = useQuery({
      queryKey: ['user'],
      queryFn: async () => {
         const response = await axiosInstance.get(`/auth/user/${userId}`);
         return response?.data?.user || {};
      },
   });

   // updating user details
   const { mutate: editUser, isPending: isFormSubmiting } = useMutation({
      mutationFn: async (data) => {
         const response = await axiosInstance.patch('/auth/user/edit', data, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         return response;
      },
      onSuccess: () => {
         setIsEditToggleActive(false);
         sendNotification('success', 'Profile updated successfully');
         queryClient.invalidateQueries(['user']);
      },
      onError: (error) => {
         console.log('error: ', error);
         if (error?.response?.data?.code === 'DUPLICATE_KEY') {
            sendNotification('warning', 'Email already exists');
         }
         if (error?.response?.data?.code === 'ERROR') {
            sendNotification('warning', error?.response?.data?.message);
         }
      },
   });

   // setting default profile form field values
   useEffect(() => {
      if (isSuccess && authUser) {
         setValue('username', authUser.username || '');
         setValue('email', authUser.email || '');
         setValue('phone', authUser.phone || '');

         dispatch(updateAuthUser(authUser));
      }
   }, [authUser, dispatch, isSuccess, setValue]);

   const handleUpdateUser = (data) => {
      if (!data || !isEditToggleActive) return;

      const formData = new FormData();

      if (file) {
         formData.append('picture', file);
      }

      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      editUser(formData);
   };

   return {
      authUser,
      ProfileFormInputsList,
      isEditToggleActive,
      setIsEditToggleActive,
      handleSubmit,
      register,
      errors,
      handleUpdateUser,
      isFormSubmiting,
      handleProfileImage,
      thumbnail,
   };
}
