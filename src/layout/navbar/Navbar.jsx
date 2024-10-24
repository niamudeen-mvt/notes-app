import { useEffect, useState } from 'react';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../routes';
import { IoCloseOutline } from 'react-icons/io5';
import { HiBars3BottomRight } from 'react-icons/hi2';
import BrandLogo from '../../components/shared/BrandLogo';
import useWindowSize from '../../hooks/useWindowSize';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useProfile from '../../hooks/useProfile';
import UserMenu from './UserMenu';

export default function Navbar() {
   const { isLoggedIn } = useAuth();
   const { authUser } = useProfile();
   const { pathname: currentRoute } = useLocation();

   const [showUserMenu, setShowUserMenu] = useState(false);
   const [isNavOpen, setIsNavOpen] = useState(false);
   const windowSize = useWindowSize();

   useEffect(() => {
      if (windowSize.width > 1280) {
         setIsNavOpen(false);
      }
   }, [windowSize.width]);

   const toggle = () => {
      setIsNavOpen((prev) => !prev);
   };

   const handleUserMenuToggle = () => {
      setShowUserMenu((prev) => !prev);
   };

   const NAV_MEUS = isLoggedIn ? PRIVATE_ROUTES : PUBLIC_ROUTES;

   return (
      <header className="sticky top-0 z-50">
         <div className="custom_container flex_between h-20">
            <BrandLogo />
            <nav
               className={`hidden lg:block ${
                  isNavOpen &&
                  '!flex fixed top-0 left-0 w-full h-full z-50 flex_center bg-main_clr'
               }`}
            >
               <ul
                  className={`flex_center gap-4 capitalize ${
                     isNavOpen ? 'flex-col' : ''
                  }`}
               >
                  {NAV_MEUS?.filter((route) => !route.excludeFromNav)?.map(
                     (route) => {
                        const navLinkClass =
                           currentRoute === route.path
                              ? 'text-main_clr'
                              : 'nav_link';
                        return (
                           <li
                              key={route.path}
                              className={`${navLinkClass} px-3 relative text-sm hover:text-main_light_clr ${
                                 isNavOpen && '!text-white'
                              }`}
                              onClick={() => setIsNavOpen(false)}
                           >
                              <Link to={route.path}>
                                 <p>{route.title}</p>
                              </Link>
                           </li>
                        );
                     },
                  )}

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
                           <div className="w-10 h-10 bg-main_clr rounded-full flex_center">
                              <p className="text-white uppercase font-semibold">
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

            {isNavOpen ? (
               <IoCloseOutline
                  className="cursor-pointer lg:hidden z-50 "
                  onClick={toggle}
                  size={24}
               />
            ) : (
               <HiBars3BottomRight
                  className="cursor-pointer lg:hidden z-50 "
                  onClick={toggle}
                  size={24}
               />
            )}
         </div>

         {/* user menu option will be here */}

         {/* <UserMenu /> */}
      </header>
   );
}
