import React, { useEffect } from "react";
import RoomCard from "../../components/shared/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import AddRoomModal from "../../components/shared/AddRoomModal/AddRoomModal";
import { useState } from "react";
import { getAllrooms } from "../../http";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

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
  // const { colorMode, toggleColorMode } = useColorMode();

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
        <Flex justifyContent="center" alignItems="center" height="100vh">
    <Box
          bg="#1d1d1d"
          w="80%"
          borderRadius="lg"
          height="80vh"
    >
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
          {/* <button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </button> */}
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
      </Box>
      </Flex>
    </>
  );
}

export default Rooms;
