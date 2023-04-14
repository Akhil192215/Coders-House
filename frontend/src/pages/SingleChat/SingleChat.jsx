import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollableChat from "../../components/ScrollableChat/ScrollableChat";
import { warn } from "../../components/shared/Alert/Alert";
import ProfileModal from "../../components/shared/ProfileModal/ProfileModal";
import UpdateGroupChatModal from "../../components/UpdateGroupChatModal/UpdateGroupChatModal";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { fetchAllMessages, sendMessage } from "../../http";
import { socketInit } from "../../socket";
import { setNotification } from "../../store/notificationSlice";
import { setSelectedChat } from "../../store/setChatSlice";
import styles from "../SingleChat/SingleChat.module.css";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [typing, setTyping] = useState();
  const notification = useSelector((state) => state.notification.notification);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  // const [socketConnection, setSocketConnection] = useState(false);
  const socket = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { chat } = useSelector((state) => state.setChat);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  var selectedChatCompare = chat;
  useEffect(() => {
    const init = async () => {
      socket.current = socketInit();
    };
    init();
    socket.current.emit("setup", user);
    // socket.current.on("connection", () => setSocketConnection(true));
  }, []);
  // console.log(notification, "-------------------------------------");
  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await sendMessage({
          content: newMessage,
          chatId: chat[0]._id,
        });
        // console.log("data");
        // console.log(data);
        // console.log("data");
        socket.current.emit("new message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.log(error);
        warn("Erorr occured!");
      }
    }
  };
  const fetchMessages = async () => {
    if (!chat[0]) return;
    try {
      setLoading(true);
      const { data } = await fetchAllMessages(chat[0]._id);

      setMessages(data);
      setLoading(false);
      socket.current.emit("join chat", chat[0]._id);
    } catch (error) {
      console.log(error);
      setLoading(false);
      warn("some error occured!");
    }
  };

  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chat[0];
    
  }, [chat[0]]);
  // useEffect(() => {
  //   socket.current.emit("setup", user);
  //   socket.current.on("connection", () => setSocketConnection(true));
  // }, []);
  useEffect(() => {
    socket.current.on("message received", (newMessageRecived) => {
      // console.log("newMessageRecived");
      // console.log(newMessageRecived);
      // console.log("newMessageRecived");
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecived.chat._id
      ) {
        // console.log(newMessageRecived);
        //give notification
        // if (!notification.includes(newMessageRecived)) {
        //   dispatch(setNotification(newMessageRecived));
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageRecived]);
      }
    });
  });
  return (
    <>
      {chat[0] ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              background="#2b2a2a"
              _hover={{ bg: "rgb(65,65,65)" }}
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => dispatch(setSelectedChat(""))}
            />
            {!chat[0]?.isGroupChat ? (
              <>
                {" "}
                {getSender(user, chat[0].users)}
                <ProfileModal user={getSenderFull(user, chat[0].users)} />
              </>
            ) : (
              <>
                {chat[0].chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg={colorMode === "dark" ? "#0b192f" : "#182a46"}
            color={colorMode === "dark" ? "#c8d7f4" : "#65fbd7"}
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className={styles.messages}>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessageHandler}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                border="none"
                bg="#1d1d1d"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
