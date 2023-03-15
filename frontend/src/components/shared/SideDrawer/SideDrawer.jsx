import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NotificationBadge from "react-notification-badge";
// import ProfileModal from "./ProfileModal";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal";
import { accessUserChat, logout, searchUsers } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import { warn } from "../Alert/Alert";
import { ToastContainer } from "react-toastify";
import ChatLoading from "../ChatLoading/ChatLoading";
import UserListItem from "../UserListItem/UserListItem";
import { setSelectedChat } from "../../../store/setChatSlice";
import { setChat } from "../../../store/setChatSlice";
import { Link } from "react-router-dom";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isAuth, user } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.setChat);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSearch = async () => {
    if (!search) {
      return warn("Please enter somthing to search");
    }
    try {
      setLoading(true);
      const { data } = await searchUsers(search);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return warn("some error occured!");
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await accessUserChat(userId);
      if (!chats.find((c) => c._id === data._id))
        dispatch(setChat([data, ...chats]));
      setLoadingChat(false);
      dispatch(setSelectedChat(data));
      onClose();
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
      return warn("some error occured!");
    }
  };
  const logoutHandle = async () => {
    try {
      const { data } = await logout();
      console.log(data);
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        // w="90%"
        p="5px 10px 5px 10px"
        background="#1d1d1d"
        border="none"
        borderRadius="10px"
        margin="10px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            _hover={{ bg: "rgb(65,65,65)" }}
            variant="ghost"
            onClick={onOpen}
          >
            <img src="/images/search-icon.png" alt="" />
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Coders House</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
              // count={notification.length}
              // effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
         { user &&  <Link to="/chats">
              <Button background="#2b2a2a" _hover={{ bg: "rgb(65,65,65)" }}>
                Go to chats
              </Button>
            </Link>}
            <MenuList pl={2}>
              {/* {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))} */}
            </MenuList>
          </Menu>
          {isAuth && (
            <Menu>
              <MenuButton
                _hover={{ bg: "rgb(65,65,65)" }}
                as={Button}
                bg="dark"
                rightIcon={<ChevronDownIcon />}
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user?.name}
                  src={user?.avatar}
                />
              </MenuButton>
              <MenuList bg="#2b2a2a">
                <ProfileModal user={user}>
                  <MenuItem bg="#2b2a2a">My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem bg="#2b2a2a" onClick={logoutHandle}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader background="#1d1d1d" borderBottomWidth="1px">
            Search Users
          </DrawerHeader>

          <DrawerBody background="#1d1d1d">
            <Box border="none" background="#1d1d1d" display="flex" pb={2}>
              <Input
                placeholder="Search by name or phone"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                background="#1d1d1d"
                _hover={{ bg: "rgb(65,65,65)" }}
                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <ToastContainer />
    </>
  );
};

export default SideDrawer;
