import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    role: null,
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.role = action.payload.role;
      state.isAuthenticated = true; 
    },
    clearUser: (state) => {
      state.user.name = null;
      state.user.role = null;
      state.isAuthenticated = false;
    },
  },
  
});

// Action creators are generated for each case reducer function
export const { setUser,clearUser } = authSlice.actions;

export default authSlice.reducer;