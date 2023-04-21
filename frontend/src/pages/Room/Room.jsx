import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWEBRTC } from "../../hooks/useWEBRTC/useWEBRTC";
import { socketInit } from "../../socket/index";
import { useParams, useNavigate } from "react-router-dom";
// import { getRoom } from '../../http';

import styles from "./Room.module.css";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
const socket = socketInit();

const Room = () => {
  const user = useSelector((state) => state.auth.user);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState(false);

  const { clients, provideRef, handleMute } = useWEBRTC(roomId, user);

  const naviagate = useNavigate();
  const { colorMode } = useColorMode();
  const [isMuted, setMuted] = useState(true);
  const [hide, setHide] = useState(true);
  const [userId, setUserId] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message });
    setMessage("");
  };
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
      setNewMessage(true);
    });
  });

  useEffect(() => {
    if (message) {
      setNewMessage(false);
    }
  }, [message]);

  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  const handManualLeave = () => {
    naviagate("/rooms");
  };

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) {
      return;
    }
    setMuted((prev) => !prev);
  };

  return (
    <div>
      <div className="container">
        <button onClick={handManualLeave} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span>All voice rooms</span>
        </button>
      </div>
      <Box
        bg={colorMode === "dark" ? "#182a46" : "#0b192f"}
        color={colorMode === "dark" ? "#c8d7f4" : "#65fbd7"}
        className={styles.clientsWrap}
      >
        <div className={styles.header}>
          {room && <h2 className={styles.topic}>{room.topic}</h2>}
          <div className={styles.actions}>
            {/* <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm-icon" />
            </button> */}
            <button onClick={handManualLeave} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave quietly</span>
            </button>

            {/* <button
              onClick={() => setHide(false)}
              className={styles.actionBtn1}
            >
              <span>Show chat </span>
              <img src="/images/chat-bubble.png" alt="win-icon" />
            </button> */}
            <div className={`${newMessage ? styles.newMessage : ""}`}></div>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <img
                    className={styles.userAvatar}
                    src={client.avatar}
                    alt=""
                  />
                  <audio
                    autoPlay
                    ref={(instance) => {
                      provideRef(instance, client.id);
                    }}
                  />

                  <button
                    onClick={() => handleMuteClick(client.id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img
                        className={styles.mic}
                        src="/images/mic-mute.png"
                        alt="mic"
                      />
                    ) : (
                      <img
                        className={styles.micImg}
                        src="/images/mic.png"
                        alt="mic"
                      />
                    )}
                  </button>
                  <Popover
                    returnFocusOnClose={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    placement="right"
                    closeOnBlur={false}
                  >
                    {/* <PopoverTrigger>
                      <button
                        onClick={onToggle}
                        style={{ "margin-left": "80px", "margin-top": "7px" }}
                      >
                        <IoEllipsisVerticalOutline />
                      </button>
                    </PopoverTrigger> */}
                    <PopoverContent>
                      <PopoverHeader fontWeight="semibold">
                        Options
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Button colorScheme="red">Mute</Button>{" "}
                        <Button colorScheme="red">Follow</Button>{" "}
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          {/* <Button variant="outline">Cancel</Button>
                          <Button colorScheme="red">Apply</Button> */}
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
        <div className={`${hide ? styles.hide : styles.chat}`}>
          <div className={styles.messageBox}>
            {chat.map((payload, index) => (
              <div className={styles.messagebubble}>
                {" "}
                <img src={user.avatar} alt="" /> <p>{payload.message}</p>
              </div>
            ))}
          </div>

          <div className={styles.chatInput}>
            <form onSubmit={sendChat}>
              <input
                className={styles.input}
                type="text"
                placeholder="sent message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className={styles.button} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Room;
