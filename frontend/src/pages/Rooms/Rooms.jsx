import React, { useEffect } from "react";
import RoomCard from "../../components/shared/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import AddRoomModal from "../../components/shared/AddRoomModal/AddRoomModal";
import { useState } from "react";
import { getAllrooms } from "../../http";

// const rooms = [
//   {
//     id: 1,
//     topic: "which framework best for frontend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 2,
//     topic: "which framework best for frontend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "which framework best for frontend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "which framework best for frontend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

function Rooms() {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getAllrooms();
      setRooms(data.data);
    };
    fetchRooms();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };
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
            <button onClick={openModal} className={styles.createRoomBtn}>
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
      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Rooms;
