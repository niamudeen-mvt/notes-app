import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   open: false,
   type: 'ADD',
   note: null,
};

const noteDialogSlice = createSlice({
   name: 'noteDialog',
   initialState,
   reducers: {
      openNoteDialog: (state, action) => {
         state.open = action.payload?.open;
         state.type = action.payload?.type || 'ADD';
         state.note = action.payload?.note || null;
      },
      closeNoteDialog: (state) => {
         state.open = false;
      },
   },
});

export const { openNoteDialog, closeNoteDialog } = noteDialogSlice.actions;

export default noteDialogSlice.reducer;
