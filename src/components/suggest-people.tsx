import { Box, Separator, Text } from "@chakra-ui/react";
import { PeoplesSuggest } from "./peoples-suggest";

export function SuggestPeople() {
  return (
    <Box 
      borderRadius="lg" 
      width="400px"
      height="full"
      backgroundColor="white"
      p="4"
      display="none"
      flexDirection="column"
      alignItems="center"
      gapY="3"
      xl={{
        display: "flex"
      }}
    >
      <Text 
        textStyle="lg" 
        fontWeight="medium"
      >
        Suggest people
      </Text>
      <Separator width="full" />
      <Box 
        overflowY="auto" 
        flex="1"
        width="full"
      >
        <PeoplesSuggest />
      </Box>
    </Box>
  );
}