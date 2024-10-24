import React, { useRef } from 'react';
import useProfile from '../../hooks/useProfile';
import { PRIVATE_ROUTES } from '../../routes';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useOnClickOutside from '../../hooks/useOutSideClick';

export default function UserMenu({ setShowUserMenu }) {
   const { authUser } = useProfile();

   const { handleUserLogout } = useAuth();
   const userMenuRef = useRef(null);

   useOnClickOutside(userMenuRef, () => setShowUserMenu(false));
   return (
      <div className="absolute top-11 right-3" ref={userMenuRef}>
         <div
            id="dropdownInformation"
            className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-black"
         >
            <div className="px-4 py-3 text-xs text-gray-900">
               <div>{authUser?.username}</div>
               <div className="font-medium truncate lowercase">
                  {authUser?.email}
               </div>
            </div>
            <ul
               className="py-2 text-xs text-gray-700"
               aria-labelledby="dropdownInformationButton"
            >
               {PRIVATE_ROUTES.map((route) => (
                  <Link to={route.path} key={route.path}>
                     <li className="block px-4 py-2 hover:bg-gray-100 ">
                        {route.title}
                     </li>
                  </Link>
               ))}
            </ul>
            <div className="py-2 ">
               <button
                  className="block px-4 py-2 text-xs text-gray-700  hover:bg-gray-100 w-full"
                  onClick={handleUserLogout}
               >
                  Log out
               </button>
            </div>
         </div>
      </div>
   );
}
