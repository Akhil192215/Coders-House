import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import activate from "./activateSlice";
import setChat from "./setChatSlice";
export default configureStore({
  reducer: {
    auth,
    activate,
    setChat,
  },
});
