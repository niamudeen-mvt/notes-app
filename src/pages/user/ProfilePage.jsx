import FormFieldError from '../../components/shared/FormFieldError';
import useProfile from '../../hooks/useProfile';
import Loader from '../../components/shared/Loader';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { FaCamera } from 'react-icons/fa';

export default function ProfilePage() {
   const {
      authUser,
      ProfileFormInputsList,
      isEditToggleActive,
      setIsEditToggleActive,
      handleUpdateUser,
      isFormSubmiting,
      handleSubmit,
      register,
      errors,
      thumbnail,
      handleProfileImage,
   } = useProfile();

   const userProfileImage = thumbnail || authUser?.profileImg;

   if (!authUser) return <Loader />;
   return (
      <section className="section">
         <form
            className="relative max-w-2xl w-full mx-auto p-10 bg-white rounded-lg shadow-lg"
            onSubmit={handleSubmit(handleUpdateUser)}
         >
            <div className="absolute top-5 right-5">
               <EditIcon
                  setIsEditToggleActive={setIsEditToggleActive}
                  isEditToggleActive={isEditToggleActive}
               />
            </div>

            {/* Profile form inputs */}
            <div className="space-y-6">
               <h2>Profile</h2>

               <div className="flex_center">
                  <figure className="h-32 w-32 rounded-full relative">
                     {userProfileImage ? (
                        <img
                           src={userProfileImage}
                           alt=""
                           className="w-full h-full rounded-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full rounded-full bg-main_clr flex_center">
                           <h2 className="text-white uppercase font-semibold">
                              {authUser?.username.substring(0, 1)}
                           </h2>
                        </div>
                     )}

                     <FileUploader
                        handleProfileImage={handleProfileImage}
                        isEditToggleActive={isEditToggleActive}
                     />
                  </figure>
               </div>

               {/* profile form inputs */}

               <div className="space-y-8">
                  {ProfileFormInputsList?.map((input) => (
                     <div key={input.name} className="space-y-2">
                        <div className="flex items-center gap-3 py-2 border-b">
                           <span>{input.icon}</span>
                           <input
                              type={input.type || 'text'}
                              {...register(input.name, input.rules)}
                              autoComplete="off"
                              placeholder={input.placeholder || ''}
                              disabled={!isEditToggleActive}
                           />
                        </div>
                        {errors[input.name] && (
                           <FormFieldError
                              message={errors[input.name].message}
                           />
                        )}
                     </div>
                  ))}
               </div>

               <button
                  type="submit"
                  className="btn w-full"
                  disabled={isFormSubmiting}
               >
                  {isFormSubmiting ? 'Loading...' : 'Save Changes'}
               </button>
            </div>
         </form>
      </section>
   );
}

function EditIcon({ isEditToggleActive, setIsEditToggleActive }) {
   return (
      <BiSolidMessageSquareEdit
         className={`cursor-pointer  ${isEditToggleActive && 'text-main_clr'}`}
         size={22}
         onClick={() => setIsEditToggleActive(!isEditToggleActive)}
      />
   );
}

function FileUploader({ isEditToggleActive, handleProfileImage }) {
   return (
      <div>
         <label htmlFor="file-uploader" className="cursor-pointer">
            <FaCamera className="absolute bottom-0 right-0" size={20} />
         </label>
         <input
            id="file-uploader"
            type="file"
            hidden
            onChange={handleProfileImage}
            disabled={!isEditToggleActive}
         />
      </div>
   );
}
