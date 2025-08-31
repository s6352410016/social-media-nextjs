import { IUser } from "@/utils/types";
import { Avatar, HStack, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface PeopleProps {
  users: IUser[];
}

export function Peoples({ users }: PeopleProps) {
  return (
    <>
      {users.map((user) => (
        <Link
          key={user.id}
          display="block"
          py="2"
          px="3"
          borderRadius="sm"
          asChild
          _hover={{
            backgroundColor: "gray.100",
            transitionDuration: "slow",
            textDecoration: "none",
          }}
        >
          <NextLink href={`/profile/${user.id}`}>
            <HStack gapX="3" my="2">
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
          </NextLink>
        </Link>
      ))}
    </>
  );
}
