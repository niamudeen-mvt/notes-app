import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';

const ProtectedRoute = ({ children }) => {
   const { userId } = useLocalStorage();
   return <>{userId === null ? <Home /> : <Outlet>{children}</Outlet>}</>;
};

export default ProtectedRoute;
