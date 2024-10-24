import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { _config } from '../../constants';

export default function BrandLogo() {
   return (
      <>
         <Link to="/" className="text-white flex items-center gap-4">
            <FiEdit2 size={22} />
            <h3 className="font-bold">{_config.PROJECT_NAME}</h3>
         </Link>
      </>
   );
}
