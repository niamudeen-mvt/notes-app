import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { _router } from './routes';
import { ToastContainerNotification } from './utils/notifications';

export default function App() {
   return (
      <>
         <RouterProvider router={_router} />
         <ToastContainerNotification />
      </>
   );
}
