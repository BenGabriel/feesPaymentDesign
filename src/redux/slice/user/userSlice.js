import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: null,
  loggedIn: false,
  rrr: ""
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: state => {
      state.loggedIn = true;
    },
    saveRRR: (state, action) => {
      state.rrr = action.payload;
    },
    updateLevel : (state, action) => {
      state.user = {...state.user, level: action.payload}
      state.rrr = ""
    },
    logoutUser: state => {
      state.loggedIn = false
      state.user = null
      state.rrr = ""
    }
  },
});

export const {saveUser, saveRRR, updateLevel, loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
