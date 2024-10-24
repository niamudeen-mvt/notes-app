import { useForm } from 'react-hook-form';
import FormFieldError from '../../components/shared/FormFieldError';
import useNote from '../../hooks/useNote';
import { useDispatch } from 'react-redux';
import { closeNoteDialog } from '../../store/features/noteDialogSlice';
import { FormInputsList } from '../../constants';

export default function NoteDialog() {
   const {
      activeNote,
      isNoteType,
      editNote,
      addNote,
      isFormSubmitting,
      isPending,
   } = useNote();

   const dispatch = useDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         title: activeNote?.title || '',
         message: activeNote?.message || '',
      },
   });

   const handleClose = () => {
      dispatch(closeNoteDialog());
   };

   const onSubmit = (data) => {
      if (!data) return;

      if (isNoteType === 'EDIT') {
         return editNote(data);
      }

      addNote(data);
   };

   const NoteDialogInpuList =
      (FormInputsList &&
         FormInputsList.filter((input) => input.isNoteDialog)) ||
      [];

   return (
      <div className="fixed bg-backdrop inset-0 w-full h-full z-50 flex_center px-[8%]">
         <div className="relative bg-white rounded-3xl shadow max-w-2xl w-full min-h-[500px] p-8">
            {/* close button */}
            <div className="flex items-center justify-between">
               <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={handleClose}
               >
                  <svg
                     className="w-3 h-3"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 14"
                  >
                     <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                     />
                  </svg>
                  <span className="sr-only">Close modal</span>
               </button>
            </div>

            {/* Form  */}

            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="space-y-6">
                  {NoteDialogInpuList?.map((input) => (
                     <div className="space-y-2" key={input.name}>
                        <LabelText>{input.name}</LabelText>
                        <textarea
                           {...register(input.name, input.rules)}
                           autoComplete="off"
                           className="custom_input hide_scrollbar"
                           rows={input.rows}
                        />
                        {errors[input.name] && (
                           <FormFieldError
                              message={errors[input.name].message}
                           />
                        )}
                     </div>
                  ))}

                  <button
                     type="submit"
                     className="btn"
                     disabled={isFormSubmitting || isPending}
                  >
                     {isFormSubmitting || isPending
                        ? 'Submitting...'
                        : 'Submit'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

function LabelText({ children, isRequired = true, maxChar }) {
   return (
      <div className="flex">
         <label className="capitalize text-xs flex flex-col gap-1">
            <p className="flex gap-1 text-sm">
               {children}
               {isRequired && (
                  <span className="font-semibold text-main_dark_clr">*</span>
               )}
            </p>
            {maxChar && (
               <span className="text-[10px] text-gray-400">{maxChar}</span>
            )}
         </label>
      </div>
   );
}
