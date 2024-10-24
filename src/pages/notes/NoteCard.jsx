import React, { useState } from 'react';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { openNoteDialog } from '../../store/features/noteDialogSlice';
import useNote from '../../hooks/useNote';
import { setDataIntoLc } from '../../utils/helper';
import InfoDialog from '../../components/shared/InfoDialog';
import ImagePreview from '../../components/ImagePreview';

// const categoryList = [
//    {
//       id: 1,
//       name: 'Personal',
//    },
//    {
//       id: 2,
//       name: 'Work',
//    },
//    {
//       id: 3,
//       name: 'Others',
//    },
// ];

// function Label({ children }) {
//    return (
//       <div className="flexr">
//          <p className="text-xs bg-red-500 p-1 px-3 text-white rounded">
//             {children}
//          </p>
//       </div>
//    );
// }

export default function NoteCard({ note }) {
   const { deleteNote, isNoteDeleted } = useNote();
   const [showInfoDialog, setShowInfoDialog] = useState(false);
   const [showImagePreview, setShowImagePreview] = useState(false);

   const dispatch = useDispatch();

   const handleAccept = () => {
      setShowInfoDialog(false);
      deleteNote();
   };

   const handleCancel = () => {
      setShowInfoDialog(false);
   };

   const handleEdit = () => {
      dispatch(
         openNoteDialog({
            type: 'EDIT',
            note: note,
            open: true,
         })
      );
   };

   const handleDelete = () => {
      dispatch(
         openNoteDialog({
            type: 'DELETE',
            note: note,
            open: false,
         })
      );
      setShowInfoDialog(true);
   };

   const handleImagePreview = (note) => {
      if (!note) return;
      setDataIntoLc('active_note_image', note.image || null);
      setShowImagePreview(true);
   };

   const createdDate = moment(note.updatedAt).format('MMM Do YY');

   const createdTime = moment(note.updatedAt).startOf('minute').fromNow();

   return (
      <>
         <ImagePreview
            setShowImagePreview={setShowImagePreview}
            showImagePreview={showImagePreview}
         />
         <InfoDialog
            showInfoDialog={showInfoDialog}
            setShowInfoDialog={setShowInfoDialog}
            handleAccept={handleAccept}
            handleCancel={handleCancel}
         />
         <article className="mx-auto bg-white h-[500px] max-w-[280px] w-full shadow-lg p-8 rounded-3xl relative overflow-hidden">
            {/* pin icon */}

            {/* 
            <div className="absolute top-8 left-8">
               <Label>{"Personal"}</Label>
            </div> */}

            <div className="absolute top-8 right-8">
               {/* <TiPinOutline size={18} /> */}
               {/* <TiPin /> */}
            </div>

            <div className="space-y-4 overflow-hidden  pb-16 mt-8">
               {/* note date */}
               <div className="flex_between">
                  <p className="text-xs">{createdDate}</p>
                  <p className="text-xs text-gray-400">{createdTime}</p>
               </div>

               {/* note title */}
               <h3>{note.title}</h3>

               {/* note image */}
               {note.image && (
                  <div
                     className="w-full h-[200px] overflow-hidden"
                     onClick={() => handleImagePreview(note)}
                  >
                     <img
                        src={note.image}
                        alt="note"
                        className="cursor-pointer object-contain"
                     />
                  </div>
               )}

               {/* message */}
               <p className="text-sm max-h-[250px] overflow-hidden overflow-y-auto text-gray-700 hide_scrollbar">
                  {note.message}
               </p>
            </div>

            {/* bottom part */}
            <div className="absolute bottom-8 text-xs grid gap-4">
               <div className="flex gap-4">
                  <button className="btn" onClick={handleEdit}>
                     Edit
                  </button>
                  <button
                     className="btn !bg-gray-200 !text-black"
                     onClick={handleDelete}
                     disabled={isNoteDeleted}
                  >
                     {isNoteDeleted ? 'Deleting...' : 'Delete'}
                  </button>
               </div>
            </div>
         </article>
      </>
   );
}
