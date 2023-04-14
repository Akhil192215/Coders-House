import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 notification : []
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
   state.notification.push(action.payload)
    },
  },
});


export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
