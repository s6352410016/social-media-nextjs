import { VStack } from "@chakra-ui/react";
import { RegisterForm } from "./register-form";
import { SocialLogin } from "./social-login";

export function Register() {
  return (
    <VStack gapY="3">
      <RegisterForm />
      <SocialLogin />
    </VStack>
  );
}
