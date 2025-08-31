import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export function Notifies() {
  return (
    <>
      <Link
        asChild
        _hover={{
          backgroundColor: "gray.100",
          transitionDuration: "slow",
          textDecoration: "none",
        }}
        borderRadius="sm"
        display="block"
      >
        <NextLink href="">
          <HStack alignItems="center" gapX="3" padding="2">
            <Avatar.Root size="xl">
              <Avatar.Fallback />
            </Avatar.Root>
            <VStack alignItems="start" justifyContent="center" gap="0">
              <Text fontWeight="medium" truncate>
                fullnameeeee...
              </Text>
              <Flex maxW="200px">
                <Text fontWeight="normal" truncate>
                  notify data
                </Text>
              </Flex>
              <Text color="fg.muted" textStyle="sm">
                1 mins ago
              </Text>
            </VStack>
          </HStack>
        </NextLink>
      </Link>
    </>
  );
}
