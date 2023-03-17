import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/shared/Editor/Editor";
import useLocalStorage from "../../hooks/LocalStorage/useLocalStorage";
import { useWEBRTC } from "../../hooks/useWEBRTC/useWEBRTC";
import { socketInit } from "../../socket";
import styles from "./CodeRoom.module.css";
const socket = socketInit();
const CodeRoom = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const user = useSelector((state) => state.auth.user);
  // const [html, setHtml] = useLocalStorage("html", "");
  // const [css, setCss] = useLocalStorage("css", "");
  // const [js, setJs] = useLocalStorage("js", "");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const handleCodeChange = (editor, code) => {
    socket.emit("code change", {
      editor,
      code,
    });
  };

  useEffect(() => {
    socket.on("code change", (data) => {
      switch (data.editor) {
        case "editor1":
          setHtml(data.code);
          break;
        case "editor2":
          setCss(data.code);
          break;
        case "editor3":
          setJs(data.code);
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState(false);

  const { clients, provideRef, handleMute } = useWEBRTC(roomId, user);
  console.log(clients);
  const naviagate = useNavigate();

  const [isMuted, setMuted] = useState(true);
  const [hide, setHide] = useState(true);

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
  console.log(chat);
  // useEffect(() => {
  //     const fetchRoom = async () => {
  //         const { data } = await getRoom(roomId);
  //         setRoom((prev) => data);
  //     };

  //     fetchRoom();
  // }, [roomId]);

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
const copyRoomId = ()=>{
  navigator.clipboard.writeText(roomId)
}
  return (
    <>
      <div>
        <Button m="5" ref={btnRef} colorScheme="red" onClick={onOpen}>
          Show connected Users
        </Button>
        <Button onClick={handManualLeave} colorScheme="blue">
          Leave Room
        </Button>
        <Button  className={styles.copy} onClick={copyRoomId} colorScheme="green">
         CopyRoom ID
        </Button>

        <div className={styles.paneTop}>
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={(code) => handleCodeChange("editor1", code)}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={(code) => handleCodeChange("editor2", code)}
          />
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={(code) => handleCodeChange("editor3", code)}
          />
        </div>
        <div className={styles.pane}>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
    
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="#000"></DrawerHeader>

          <DrawerBody bg="#000">
            <div className="container">
              {/* <button onClick={handManualLeave} className={styles.goBack}>
            <img src="/images/arrow-left.png" alt="arrow-left" />
          </button> */}
              {/* <span>Connected Users</span> */}

              <div className={styles.clientsWrap}>
                <div className={styles.header}>
                  {room && <h2 className={styles.topic}>{room.topic}</h2>}
                  <div className={styles.actions}>
                    {/* <button onClick={handManualLeave} className={styles.actionBtn}>
                <img src="/images/win.png" alt="win-icon" />
                <span>Leave quietly</span>
              </button> */}

                    {/* <button
                onClick={() => setHide(false)}
                className={styles.actionBtn1}
              >
                <span>Show chat </span>
                <img src="/images/chat-bubble.png" alt="win-icon" />
              </button> */}
                    <div
                      className={`${newMessage ? styles.newMessage : ""}`}
                    ></div>
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
                          {/* <span className={styles.remove}>R</span> */}
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
                        <img src={user.avatar} alt="" />{" "}
                        <p>{payload.message}</p>
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
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter bg="#000">
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter >
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CodeRoom;
