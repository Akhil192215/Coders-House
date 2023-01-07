import React from "react";
import RoomCard from "../../components/shared/RoomCard/RoomCard";
import styles from "./Room.module.css";

const rooms = [
  {
    id: 1,
    topic: "which framework best for frontend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 1,
    topic: "which framework best for frontend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 1,
    topic: "which framework best for frontend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 1,
    topic: "which framework best for frontend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
];

function Room() {
  return (
    <>
      <div className="container">
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <div className={styles.heading}>All voice rooms</div>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="" />
              <input className={styles.searchIput} type="text" />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.createRoomBtn}>
              <img src="/images/add-room-icon.png" alt="" />
              <span>Start a room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {rooms.map((room) => (
            <>
              <RoomCard key={room.id} room={room} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Room;
