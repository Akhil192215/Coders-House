import React, { useEffect } from "react";
import RoomCard from "../../components/shared/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import AddRoomModal from "../../components/shared/AddRoomModal/AddRoomModal";
import { useState } from "react";
import { getAllrooms } from "../../http";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { warn } from "../../components/shared/Alert/Alert";
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
  const [searchObject, setSearchObject] = useState([]);
  const [searchRoom, setSearchRoom] = useState("");
  // const { colorMode, toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllrooms();
        const renderedObjects = data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
        setRooms(renderedObjects);
      } catch (error) {
        if (error.response.data.message) {
          warn("your blocked by the admin");
        }
      }
    };
    fetchRooms();
  }, []);
  useEffect(() => {
    setSearchObject(
      searchRoom
        ? rooms.filter((object) =>
            object.topic.toLowerCase().includes(searchRoom.toLowerCase())
          )
        : rooms
    );
  }, [searchRoom, rooms]);
  const openModal = () => {
    setShowModal(true);
  };
  // console.log(rooms);
  return (
    <>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Box
          bg={colorMode === "dark" ? "darak.900" : "#F"}
          color={colorMode === "dark" ? "#65fbd7" : "#0b192f"}
          p={4}
          rounded="md"
          w="80%"
          borderRadius="lg"
          height="80vh"
        >
          <Box className="container">
            <div className={styles.roomHeader}>
              <div className={styles.left}>
                <div className={styles.heading}>All voice rooms</div>
                <div className={styles.searchBox}>
                  <img src="/images/search-icon.png" alt="" />
                  <input
                    onChange={(e) => setSearchRoom(e.target.value)}
                    className={styles.searchIput}
                    type="text"
                  />
                </div>
              </div>
              <div className={styles.right}>
                <button onClick={openModal} className={styles.createRoomBtn}>
                  <img src="/images/add-room-icon.png" alt="" />
                  <span>Start / Join</span>
                </button>
              </div>
            </div>
            <div className={styles.roomList}>
              {searchObject.map((room) => (
                <>
                  {`${room.roomType === "open"}` ? (
                    <RoomCard key={room.id} room={room} />
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </Box>
          {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
        </Box>
      </Flex>
    </>
  );
}

export default Rooms;
