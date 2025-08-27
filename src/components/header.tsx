import { Box } from "@chakra-ui/react";
import { Logo } from "./logo";
import { SearchPeople } from "./search-people";

export function Header() {
  return (
    <Box
      height="70px"
      width="full"
      padding="4"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gapX="10"
      shadow="sm"
    >
      <Logo />
      <SearchPeople />
    </Box>
  );
}
