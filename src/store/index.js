import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import noteDialogSlice from './features/noteDialogSlice';

export const store = configureStore({
   reducer: {
      authUser: authSlice,
      noteDialog: noteDialogSlice,
   },
});
