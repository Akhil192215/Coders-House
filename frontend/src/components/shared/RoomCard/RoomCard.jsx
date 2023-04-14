import React from "react";
import styles from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";
import { Box, useColorMode } from "@chakra-ui/react";

const RoomCard = ({room}) => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  return (
    <Box bg={colorMode === "dark" ? "#182a46" : "#182a46"}
    color={colorMode === "dark" ? "#c8d7f4" : "#65fbd7"} onClick={()=>{navigate(`/room/${room.id}`)}} className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={`${styles.speakers} ${room.speakers.length===1 ? styles.singleSpeaker : ''}`}>
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} className={styles.avatar} src={speaker.avatar} alt="speaker" />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className={styles.nameWrapper}>
              <span>  {speaker.name}</span>
              <img src="images/chat-bubble.png" alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="images/user-icon.png" alt="" />
      </div>
    </Box>
  );
};

export default RoomCard;
