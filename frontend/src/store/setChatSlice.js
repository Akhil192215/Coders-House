import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: [],
  chats: [],
};

export const setChatSlice = createSlice({
  name: "setChat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.chat[0] = (action.payload);
      console.log(state.chat[0]._id);
    },
    setChat(state, action) {
      state.chats = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedChat, setChat } = setChatSlice.actions;

export default setChatSlice.reducer;
