import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: Boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContext)
  
  // console.log(user)

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            {user?.email}
          </Text>
        </Box>
      )}
      <Avatar size="md" name={user?.name} src={user?.avatar} />
    </Flex>
  );
}
