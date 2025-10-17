import { Box, Separator, Text } from "@chakra-ui/react";
import { UsersStatus } from "./users-status";

export function PeopleStatus() {
  return (
    <Box
      backgroundColor="white"
      width="full"
      height="full"
      minHeight="0"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      gapY="3"
      alignItems="center"
      p="4"
    >
      <Text 
        textStyle="lg" 
        fontWeight="medium"
      >
        People status
      </Text>
      <Separator width="full" />
      <Box overflowY="auto" flex="1" width="full">
        <UsersStatus />
      </Box>
    </Box>
  );
}
