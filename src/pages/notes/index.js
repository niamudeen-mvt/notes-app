import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import NoteDialog from './NoteDialog';
import NoteCard from './NoteCard';
import Loader from '../../components/shared/Loader';
import axiosInstance from '../../utils/axios';
import { getDataFromLc } from '../../utils/helper';
import { openNoteDialog } from '../../store/features/noteDialogSlice';
import useNote from '../../hooks/useNote';

export default function NotesPage() {
   const { isNoteOpen } = useNote();

   const userId = getDataFromLc('user_id');

   const {
      data: notes,
      isLoading: fetchingNotes,
      isRefetching,
   } = useQuery({
      queryKey: ['notes', userId],
      queryFn: async () => {
         const response = await axiosInstance.get(`/notes/${userId}`);
         return response?.data?.notes || [];
      },
      retry: 1,
   });

   const dispatch = useDispatch();

   const handleOpenDialog = () => {
      dispatch(
         openNoteDialog({
            type: 'ADD',
            open: true,
            note: null,
         })
      );
   };

   if (isRefetching || fetchingNotes) return <Loader />;

   return (
      <>
         {isNoteOpen && <NoteDialog />}
         <section
            className={`custom_container section_custom_height py-8  ${
               notes?.length > 0 ? '' : 'flex_center'
            }`}
         >
            {notes?.length > 0 ? (
               <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {notes.map((note) => {
                     return <NoteCard key={note._id} note={note} />;
                  })}
               </div>
            ) : (
               <p> No Notes Found</p>
            )}
         </section>

         <div className="fixed bottom-20 left-0 w-full flex_center">
            <button
               className="bg-white rounded-full w-14 h-14 shadow-lg flex_center"
               onClick={handleOpenDialog}
               type="button"
            >
               <FiPlus className="text-black" />
            </button>
         </div>
      </>
   );
}
