import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import activate from "./activateSlice";
import setChat from "./setChatSlice";
import notification from "./notificationSlice";
export default configureStore({
  reducer: {
    auth,
    activate,
    setChat,
    notification
  },
});
