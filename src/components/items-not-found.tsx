import { Flex, Text } from "@chakra-ui/react";

interface ItemsNotFoundProps {
  title?: string;
}

export function ItemsNotFound({ title }: ItemsNotFoundProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="full"
      width="full"
    >
      <Text my="4" textAlign="center" fontSize="md">
        {title ?? "Items"} not found
      </Text>
    </Flex>
  );
}
