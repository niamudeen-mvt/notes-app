import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const Logout = () => {
   const { userLogout } = useAuth();

   useEffect(() => {
      userLogout();
   }, [userLogout]);

   return <Navigate to="/" />;
};

export default Logout;
