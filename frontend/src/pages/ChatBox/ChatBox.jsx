import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SingleChat from "../SingleChat/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { chats, chat } = useSelector((state) => state.setChat);
  return (
    <Box
      display={{ base: chat[0] ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      border="none"
      p={3}
      bg="#1d1d1d"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
