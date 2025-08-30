import { Icon, Stack } from "@chakra-ui/react";
import { ImSpinner8 } from "react-icons/im";

export function Spinner() {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Icon size="xl" color="black">
        <ImSpinner8 className="animate-spin" />
      </Icon>
    </Stack>
  );
}
