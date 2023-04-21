import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, groupRemove, groupRename, searchUsers } from "../../http";
import { setSelectedChat } from "../../store/setChatSlice";
import { warn } from "../shared/Alert/Alert";
import UserListItem from "../shared/UserListItem/UserListItem";
import UserBadgeItem from "../UserBadgeItem/UserBadgeItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [renameloading, setRenameLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { chat } = useSelector((state) => state.setChat);
  const handleRemove = async (user1) => {
    if (chat[0].groupAdmin._id !== user.id) {
      return warn("Only admnin can add someone!");
    }
    try {
      if (user1._id === undefined) {
        setLoading(true);
        const { data } = groupRemove({ chatId: chat[0]._id, userId: user1.id });
        user1.id === user.id
          ? dispatch(setSelectedChat())
          : dispatch(setSelectedChat(data));
        warn("You Left");
        setFetchAgain(!fetchAgain);
        fetchMessages()
        setLoading(false);
      } else {
        setLoading(true);
        const { data } = groupRemove({
          chatId: chat[0]._id,
          userId: user1._id,
        });
        user1._id === user.id
          ? dispatch(setSelectedChat())
          : dispatch(setSelectedChat(data));
        warn("user removed successfully");
        setFetchAgain(!fetchAgain);
        fetchMessages()
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return warn("somthing is went wrong");
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return warn("enter name to update");
    try {
      setRenameLoading(true);
      const { data } = await groupRename({
        chatId: chat[0]._id,
        chatName: groupChatName,
      });
      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      setRenameLoading(false);
      return warn("somthing went wrong");
    }
  };
  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setSearch(query);
    try {
      setLoading(true);
      const { data } = await searchUsers(search);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      warn("Failed to load the search results!");
      setLoading(false);
    }
  };
  const handleAddUser = async (user1) => {
    if (chat[0].users.find((u) => u._id === user1._id)) {
      return warn("user alredy added!");
    }
    if (chat[0].groupAdmin._id !== user.id) {
      return warn("Only admnin can add someone!");
    }
    try {
      setLoading(true);
      const { data } = await addUser({
        chatId: chat[0]._id,
        userId: user1._id,
      });
      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setLoading(false);
      warn("user added");
      onClose();
    } catch (error) {
      console.log(error);
      warn("somthing went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <IconButton     background="#2b2a2a"
            _hover={{ bg: "rgb(65,65,65)" }}  d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            display="flex"
            justifyContent="center"
            bg="#1d1d1d"
          >
            {chat[0].chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            bg="#1d1d1d"
          >
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {chat[0].users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={chat[0].groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((u) => (
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleAddUser(u)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter bg="#1d1d1d">
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateGroupChatModal;
