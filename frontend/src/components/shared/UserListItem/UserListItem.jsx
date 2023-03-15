import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";

const UserListItem = ({user, handleFunction }) => {
  

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      background= "#1A202C"
      color="white"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
  
      px={4}
      py={5}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.avatar}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Phone : </b>
          {user.phone}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
