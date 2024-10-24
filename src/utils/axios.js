import axios from 'axios';
import { getDataFromLc, setDataIntoLc } from './helper';
import { refreshToken } from '../services/api/user';
import { sendNotification } from './notifications';

const axiosInstance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosInstance.interceptors.request.use(
   async function (config) {
      if (!['/auth/login', '/auth/register'].includes(config.url)) {
         config.headers['Authorization'] = `Bearer ${getDataFromLc(
            'access_token'
         )}`;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   function (response) {
      return response;
   },
   async function (error) {
      sendNotification('error', error?.response?.data?.message);

      const originalRequest = error.config;
      if (error?.response?.status === 401) {
         const userId = getDataFromLc('user_id');
         if (!userId) return;
         const response = await refreshToken(userId);

         const token = response?.data?.token || null;

         if (token) {
            setDataIntoLc('access_token', token);
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
         }
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
