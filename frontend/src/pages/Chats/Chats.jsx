import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import SideDrawer from "../../components/shared/SideDrawer/SideDrawer";
import ChatBox from "../ChatBox/ChatBox";
import MyChats from "../MyChats/MyChats";

// import Chatbox from "../components/Chatbox";
// import MyChats from "../components/MyChats";
// import SideDrawer from "../components/miscellaneous/SideDrawer";

const Chats = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>    

    </div>
  );
};

export default Chats;
