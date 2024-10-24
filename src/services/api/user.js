import api from '../../utils/axios';
import {
   EDIT_USER_DETAILS,
   LOGIN_USER,
   REFRESH_TOKEN,
   REGISTER_USER,
   USER_DETAILS,
} from '../url';

export const registerUser = async (body) => {
   try {
      const response = await api.post(REGISTER_USER, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const loginUser = async (body) => {
   try {
      const response = await api.post(LOGIN_USER, body);
      return response;
   } catch (error) {
      return error;
   }
};
export const getUserDetails = async () => {
   try {
      const response = await api.get(USER_DETAILS);
      return response;
   } catch (error) {
      return error;
   }
};

export const editUserDetials = async (body) => {
   try {
      const response = await api.patch(EDIT_USER_DETAILS, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const refreshToken = async (userId) => {
   try {
      const response = await api.post(REFRESH_TOKEN + `${userId}`);
      return response;
   } catch (error) {
      return error;
   }
};
