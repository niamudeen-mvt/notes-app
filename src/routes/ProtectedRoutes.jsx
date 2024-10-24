import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ThemeContainer from '../layout/ThemeContainer';
import Navbar from '../layout/navbar';
import { _config } from '../constants';

export default function ProtectedRoutes({ children }) {
   const { isLoggedIn } = useAuth();

   if (!isLoggedIn) return <Navigate to={_config.REDIRECT.LOGOUT_SUCCESS} />;

   return (
      <>
         <ThemeContainer>
            <Navbar />
            {children}
         </ThemeContainer>
      </>
   );
}
