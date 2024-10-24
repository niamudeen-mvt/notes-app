import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const themeType = 'light';

const generateToast = (type, msg) => {
   const toastType = {
      success: toast.success,
      warning: toast.warning,
      error: toast.error,
   }[type || 'error'];

   return toastType(`${msg}`, {
      className: 'bg-white relative z-50 text-black text-xs',
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: { themeType },
   });
};

export const sendNotification = (type, msg) => {
   generateToast(type, msg);
};

export const ToastContainerNotification = () => {
   return (
      <ToastContainer
         position="top-center"
         autoClose={1000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme={themeType}
      />
   );
};
