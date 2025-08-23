"use client";

import { formatString } from "@/utils/helpers/format-string";
import { Button, Card, Icon, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Link from "next/link";

export function LoginError() {
  const messages = useSearchParams().get("message")!;

  return (
    <VStack height="100vh" justifyContent="center">
      <Card.Root width="500px" variant="elevated">
        <Card.Body gap="2">
          <Icon 
            color="red.600"
            size="2xl" 
            textAlign="center"
            display="block"
            width="full"
          >
            <IoIosInformationCircleOutline />
          </Icon>
          <Card.Title 
            textAlign="center"
            fontSize="2xl"
            color="red.600"
            mb="2"
          >
            Social login error!
          </Card.Title>
          <Card.Description
            textAlign="center"
            fontSize="md"
            fontWeight="semibold"
            color="gray.800"
          >
            {formatString(messages)}
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button asChild>
            <Link href="/">Back to login</Link>
          </Button>
        </Card.Footer>
      </Card.Root>
    </VStack>
  );
}
