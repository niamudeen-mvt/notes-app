import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { _config } from '../constants';

export default function PublicRoutes({ children }) {
   const { isLoggedIn } = useAuth();

   if (isLoggedIn) return <Navigate to={_config.REDIRECT.LOGIN_SUCCESS} />;

   return <div className="container mx-auto">{children}</div>;
}
