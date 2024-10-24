import { createSlice } from '@reduxjs/toolkit';
import { getDataFromLc } from '../../utils/helper';

const initialState = {
   isLoggedIn: getDataFromLc('access_token') ? true : false,
   data: null,
};

const authUserSlice = createSlice({
   name: 'authUser',
   initialState,
   reducers: {
      updateAuthState: (state) => {
         state.isLoggedIn = true;
      },
      updateAuthUser: (state, action) => {
         state.data = action.payload;
      },
      userLogout: (state) => {
         state.isLoggedIn = false;
         state.data = null;
      },
   },
});

export const { updateAuthState, userLogout, updateAuthUser } =
   authUserSlice.actions;
export default authUserSlice.reducer;
