import { navigate } from "@/utils/helpers/router";
import { IUser } from "@/utils/types";
import { Avatar, Box, HStack, Stack, Text } from "@chakra-ui/react";

interface PeopleProps {
  users: IUser[];
  onClosePopover: (open: boolean) => void;
}

export function Peoples({ users, onClosePopover }: PeopleProps) {
  function handleClickPeople(userId: number) {
    onClosePopover(false);
    navigate(`/profile/${userId}`);
  }

  return (
    <>
      {users.map((user) => (
        <Box
          key={user.id}
          py="2"
          px="3"
          borderRadius="sm"
          cursor="pointer"
          _hover={{
            backgroundColor: "gray.100",
            transitionDuration: "slow",
          }}
        >
          <HStack 
            onClick={() => handleClickPeople(user.id)}
            gapX="3" 
            my="2"
          >
            {user.profileUrl ? (
              <Avatar.Root size="xl">
                <Avatar.Fallback name={user.fullname} />
                <Avatar.Image src={user.profileUrl} />
              </Avatar.Root>
            ) : (
              <Avatar.Root size="xl">
                <Avatar.Fallback name={user.fullname} />
              </Avatar.Root>
            )}
            <Stack gap="0">
              <Text fontWeight="medium">{user.fullname}</Text>
              <Text color="fg.muted" textStyle="sm">
                {user.email}
              </Text>
            </Stack>
          </HStack>
        </Box>
      ))}
    </>
  );
}
