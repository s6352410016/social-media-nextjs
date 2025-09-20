import { Icon, Stack } from "@chakra-ui/react";
import { ImSpinner8 } from "react-icons/im";

export function Spinner() {
  return (
    <Stack 
      justifyContent="center" 
      alignItems="center"
      my="1"
    >
      <Icon size="xl" color="blackAlpha.700">
        <ImSpinner8 className="animate-spin" />
      </Icon>
    </Stack>
  );
}
