import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SingleChat from "../SingleChat/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { chats, chat } = useSelector((state) => state.setChat);
  const { colorMode } = useColorMode();
  return (
    <Box
      display={{ base: chat[0] ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      border="none"
      p={3}
      bg={colorMode === "dark" ? "#182a46" : "#0b192f"}
        color={colorMode === "dark" ? "#c8d7f4" : "#65fbd7"}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
