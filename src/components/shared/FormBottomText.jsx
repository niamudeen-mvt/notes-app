import React from 'react';
import { Link } from 'react-router-dom';

export default function FormBottomText({ text, link, linkText }) {
   return (
      <p>
         {text}
         <Link to={link} className="ml-1 text-main_clr">
            {linkText}
         </Link>
      </p>
   );
}
