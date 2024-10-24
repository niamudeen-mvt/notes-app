import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { closeNoteDialog } from '../store/features/noteDialogSlice';
import axiosInstance from '../utils/axios';
import { sendNotification } from '../utils/notifications';

export default function useNote() {
   const activeNoteState = useSelector((state) => state.noteDialog);

   const activeNote = activeNoteState?.note;
   const activeNoteId = activeNote?._id;
   const isNoteOpen = activeNoteState?.open;
   const isNoteType = activeNoteState?.type;

   const dispatch = useDispatch();
   const queryClient = useQueryClient();

   // delete note
   const { mutate: deleteNote, isPending: isNoteDeleted } = useMutation({
      mutationFn: async () => {
         const response = await axiosInstance.patch(
            `/notes/delete/${activeNoteId}`,
         );
         return response;
      },
      onSuccess: () => {
         queryClient.invalidateQueries(['notes']);
         sendNotification('success', 'Note deleted successfully');
      },
      onError: (error) => {
         console.log('error: ', error);
      },
   });

   // add note
   const { mutate: addNote, isPending: isFormSubmitting } = useMutation({
      mutationFn: async (data) => {
         const response = await axiosInstance.post('/notes/add', data);
         return response;
      },
      onSuccess: () => {
         queryClient.invalidateQueries(['notes']);
         sendNotification('success', 'Note added successfully');
         dispatch(closeNoteDialog());
      },
      onError: (error) => {
         if (error?.response?.data?.code === 'ERROR') {
            sendNotification('warning', error?.response?.data?.message);
         }
      },
   });

   // edit note
   const { mutate: editNote, isPending } = useMutation({
      mutationFn: async (data) => {
         const response = await axiosInstance.patch(
            `/notes/edit/${activeNoteId}`,
            data,
         );
         return response;
      },
      onSuccess: () => {
         queryClient.invalidateQueries(['notes']);
         sendNotification('success', 'Note updated successfully');
         dispatch(closeNoteDialog());
      },
      onError: (error) => {
         console.log('error: ', error);
         if (error?.response?.data?.code === 'ERROR') {
            sendNotification('warning', error?.response?.data?.message);
         }
      },
   });

   return {
      activeNote,
      activeNoteId,
      isNoteOpen,
      isNoteType,
      deleteNote,
      isNoteDeleted,
      addNote,
      isFormSubmitting,
      editNote,
      isPending,
   };
}
