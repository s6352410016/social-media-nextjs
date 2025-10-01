import { Box } from "@chakra-ui/react";
import { Logo } from "./logo";
import { SearchPeople } from "./search-people";
import { TopBarActions } from "./top-bar-actions";

export function Header() {
  return (
    <Box
      height="8vh"
      width="full"
      py="4"
      px="16"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gapX="10"
      shadow="sm"
    >
      <Logo />
      <SearchPeople />
      <TopBarActions />
    </Box>
  );
}
