import { Button, HStack } from "@chakra-ui/react";

export function ResendOtpLink() {
  return (
    <HStack fontWeight="normal" gapX="0">
      Don't have an otp? &nbsp;
      <Button 
        variant="plain" 
        padding="0"
      >
        resend
      </Button>
    </HStack>
  );
}