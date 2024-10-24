import { useState } from 'react';
import BrandLogo from '../../components/shared/BrandLogo';
import useProfile from '../../hooks/useProfile';
import UserMenu from './UserMenu';

export default function Navbar() {
   const { authUser } = useProfile();

   const [showUserMenu, setShowUserMenu] = useState(false);

   const handleUserMenuToggle = () => {
      setShowUserMenu((prev) => !prev);
   };

   return (
      <header className="sticky top-0 z-50">
         <div className="custom_container flex_between h-20">
            <BrandLogo />
            <nav>
               <ul className={'flex_center gap-4 capitalize'}>
                  {/* user menu will be handled here */}
                  <li
                     onClick={handleUserMenuToggle}
                     className="relative cursor-pointer"
                  >
                     {authUser?.profileImg ? (
                        <img
                           src={authUser?.profileImg}
                           alt=""
                           className="w-10 h-10 rounded-full object-cover"
                        />
                     ) : (
                        authUser?.username && (
                           <div className="w-10 h-10 bg-white  md:bg-main_clr rounded-full flex_center">
                              <p className="uppercase font-semibold text-black md:text-white">
                                 {authUser.username.substring(0, 1)}
                              </p>
                           </div>
                        )
                     )}

                     {showUserMenu && (
                        <UserMenu setShowUserMenu={setShowUserMenu} />
                     )}
                  </li>
               </ul>
            </nav>
         </div>
      </header>
   );
}
