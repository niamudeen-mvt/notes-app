import BrandLogo from './BrandLogo';

export default function BasicFormLayout({ children }) {
   return (
      <section className="custom_container min-h-screen  flex_center">
         <div className="grid grid-cols-1 lg:grid-cols-2 shadow-lg">
            <div className="flex_center relative bg-main_clr">
               <div className="hidden lg:block">
                  <BrandLogo />
               </div>
            </div>
            {children}
         </div>
      </section>
   );
}
