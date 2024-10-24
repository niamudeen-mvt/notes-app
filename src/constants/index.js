import { MdEmail } from 'react-icons/md';
import { IoLockClosed } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';

export const _config = {
   ACCESS_TOKEN_KEY: process.env.REACT_APP_ACCESS_TOKEN_KEY,
   REFRESH_TOKEN_KEY: process.env.REACT_APP_REFRESH_TOKEN_KEY,
   PROJECT_NAME: 'NOTES',
   theme: {
      main_clr: '#0d6efd',
      main_dark_clr: '#0a4eb4',
      main_light_clr: '#3e64ff',
      form_box_shadow: 'rgba(0, 0, 0, 0.35) -5px 5px 15px',
      light_grey_clr: 'b6b2b2',
      form_btn_box_shadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
   },
   REDIRECT: {
      LOGIN_SUCCESS: '/',
      LOGOUT_SUCCESS: '/login',
      SIGNUP_SUCCESS: '/login',
   },
};

// ================== REGEX MESSAGES =================
export const REGEX = {
   EMAIL: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
   PHONE: /^[6-9]\d{9}$/,
};

// ================== FORM ERROR MESSAGES =================

export const FORM_ERROR_MESSAGES = {
   REQUIRED: 'This field is required',
   EMAIL: {
      INVALID: 'Please provide a valid email address',
   },
   PASSWORD: {
      MIN_LENGTH: 'Please provide a password with at least 3 characters',
   },
   PHONE: {
      INVALID: 'Please provide a valid phone number',
   },
};

// ================== RESPONSE MESSAGES =================
export const RESPONSE_MESSAGES = {
   SEVER_ERROR: 'Something went wrong. Please try again',
};

// ================== FORM INPUTS LIST =================

export const FormInputsList = [
   {
      name: 'username',
      label: 'username',
      type: 'text',
      icon: <FaUser size={16} />,
      placeholder: 'Username',
      rules: {
         required: {
            value: true,
            message: FORM_ERROR_MESSAGES.REQUIRED,
         },
      },
      isSignup: true,
      isProfile: true,
   },
   {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'email',
      icon: <MdEmail />,
      rules: {
         required: {
            value: true,
            message: FORM_ERROR_MESSAGES.REQUIRED,
         },
         pattern: {
            value: REGEX.EMAIL,
            message: FORM_ERROR_MESSAGES.EMAIL.INVALID,
         },
      },
      isLogin: true,
      isSignup: true,
      isProfile: true,
      isForgotPassword: true,
   },
   {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      type: 'password',
      icon: <IoLockClosed />,
      rules: {
         required: {
            value: true,
            message: FORM_ERROR_MESSAGES.REQUIRED,
         },
         minLength: {
            value: 3,
            message: FORM_ERROR_MESSAGES.PASSWORD.MIN_LENGTH,
         },
      },
      isLogin: true,
      isSignup: true,
      isResetPassword: true,
   },

   {
      name: 'phone',
      label: 'Phone',
      icon: <FaPhone size={16} />,
      placeholder: 'Phone',
      type: 'text',
      rules: {
         required: {
            value: true,
            message: FORM_ERROR_MESSAGES.REQUIRED,
         },
         pattern: {
            value: REGEX.PHONE,
            message: FORM_ERROR_MESSAGES.PHONE.INVALID,
         },
      },
      isSignup: true,
      isProfile: true,
   },
   {
      name: 'title',
      type: 'text',
      rules: {
         required: {
            value: true,
            message: FORM_ERROR_MESSAGES.REQUIRED,
         },
         maxLength: {
            value: 80,
            message: 'Title should be less than 80 characters',
         },
      },
      rows: 1,
      isNoteDialog: true,
   },
   {
      name: 'message',
      type: 'text',
      rules: {
         required: {
            value: true,
            message: FORM_ERROR_MESSAGES.REQUIRED,
         },
      },
      rows: 10,
      isNoteDialog: true,
   },
];
