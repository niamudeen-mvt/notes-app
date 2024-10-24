import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthState, userLogout } from '../store/features/authSlice';
import { getDataFromLc } from '../utils/helper';

export default function useAuth() {
   const authState = useSelector((state) => state.authUser);

   const disaptch = useDispatch();
   const handleUserLogout = () => {
      disaptch(userLogout());
      localStorage.clear();
   };

   const storedToken = getDataFromLc('access_token');
   const isLoggedIn = authState.isLoggedIn;
   const authUser = authState.data;

   useEffect(() => {
      if (storedToken) disaptch(updateAuthState());
   }, [disaptch, storedToken]);

   return {
      isLoggedIn,
      authUser,
      handleUserLogout,
   };
}
