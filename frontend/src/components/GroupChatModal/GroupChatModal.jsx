import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, searchUsers } from "../../http";
import { setChat } from "../../store/setChatSlice";
import { warn } from "../shared/Alert/Alert";
import UserListItem from "../shared/UserListItem/UserListItem";
import UserBadgeItem from "../UserBadgeItem/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoadintg] = useState(false);
  const { chats } = useSelector((state) => state.setChat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setSearch(query);
    try {
      setLoadintg(true);
      const { data } = await searchUsers(search);
      setLoadintg(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      warn("Failed to load the search results!");
      setLoadintg(false);
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return warn("user alredy added");
    }
    setSelectedUsers((prev) => [...prev, userToAdd]);
  };
  const handleDlelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleSubmit = async () => {
    const { data } = await createGroup({
      name: groupChatName,
      users: selectedUsers,
    });

    dispatch(setChat([data, ...chats]));
    onClose();
    warn("group created successfully");
  };
  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            display="flex"
            justifyContent="center"
            bg="#1d1d1d"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            bg="#1d1d1d"
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display="flex" flexWrap="wrap">
              {selectedUsers?.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDlelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter bg="#1d1d1d">
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
