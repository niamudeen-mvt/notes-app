import { _config } from '../constants';
import useWindowSize from '../hooks/useWindowSize';
import Loader from '../components/shared/Loader';

const ThemeContainer = ({ children }) => {
   const windowObj = useWindowSize();

   const themeObj = {
      background: `linear-gradient(to right,${_config.theme.main_clr} ${
         windowObj.width > 768 ? '50%' : '100%'
      } , white 50%)`,
   };

   if (!windowObj?.width) return <Loader />;

   return (
      <>
         <section className="w-100" style={{ zIndex: -1 }}>
            <div className="min-h-screen" style={themeObj}>
               {children}
            </div>
         </section>
      </>
   );
};

export default ThemeContainer;
