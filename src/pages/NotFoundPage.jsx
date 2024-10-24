import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
   const navigate = useNavigate();
   const handleGoBack = () => {
      navigate(-1);
   };
   return (
      <section className="section">
         <div className="text-center space-y-3">
            <h1 className="font-bold text-main_clr">404</h1>
            <h2>Oops ! Page Not Found</h2>
            <button className="btn" onClick={handleGoBack}>
               Go Back
            </button>
         </div>
      </section>
   );
}
