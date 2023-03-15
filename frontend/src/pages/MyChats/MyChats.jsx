import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupChatModal from "../../components/GroupChatModal/GroupChatModal";
import ChatLoading from "../../components/shared/ChatLoading/ChatLoading";
import { getSender } from "../../config/ChatLogics";
import { fetchChats } from "../../http";
import { setChat, setSelectedChat } from "../../store/setChatSlice";

const MyChats = ({fetchAgain}) => {
  const { chats, chat } = useSelector((state) => state.setChat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getAllChats = async () => {
    const { data } = await fetchChats(user.id);
    dispatch(setChat(data));
 
  };
  useEffect(() => {
    getAllChats();
  },[fetchAgain]);
  return (
    <>
      <Box
        display={{ base: chat[0] ? "none" : "flex", md: "flex" }}
        flexDir="column"
        border= "none"
        alignItems="center"
        p={3}
        bg="#1d1d1d"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          border="none"
        >
          My Chats
          <GroupChatModal>
          <Button
            display="flex"
            background="#2b2a2a"
            _hover={{ bg: "rgb(65,65,65)" }} 
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
          </GroupChatModal>
        </Box>
        <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#2b2a2a"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
{
  chats ? (
    <Stack overflowY="scroll">
      {chats.map((c)=>(
        <Box   
           onClick={() => dispatch(setSelectedChat(c))}
                cursor="pointer"
                bg={chat[0] === c ? "#38B2AC" : "#1d1d1d"}
                // color={chat[0] === c ? "white" : "white"}
                px={3}
                py={2}
                borderRadius="lg"
                key={c._id} >
                      <Text>
         {!c.isGroupChat
           ? getSender(user, c.users)
           : c.chatName}
       </Text>
        </Box>
     
      ))}
    </Stack>
  ):(
    <ChatLoading/>
  )
}
      </Box>
      </Box>
    </>
  );
};

export default MyChats;
