import { Stack } from "@chakra-ui/react";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";

interface SpinnerProps {
  size?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl";
}

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      my="1"
    >
      <ChakraSpinner size={size} color="black" />
    </Stack>
  );
}
