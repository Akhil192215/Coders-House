import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  admin: null,
};

export const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAuthAdmin: (state, action) => {
      const admin = action.payload;
      state.admin = admin;
      if (admin.auth) {
        console.log("admin.auth");
        console.log(admin.auth);
        console.log("admin.auth");
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});
export const { setAuthAdmin } = adminSlice.actions;

export default adminSlice.reducer;
