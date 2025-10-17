import { formatString } from "@/utils/helpers/format-string";
import { EmptyState, VStack } from "@chakra-ui/react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";

interface ItemsNotFoundProps {
  title?: "user" | "people" | "notify";
}

export function ItemsNotFound({ title }: ItemsNotFoundProps) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          {title === "notify" ? (
            <MdNotificationsActive />
          ) : (
            <FaPeopleGroup />
          )}
        </EmptyState.Indicator>
        <VStack textAlign="center">
          {title !== "user" ? (
            <EmptyState.Title>Your {title} is empty</EmptyState.Title>
          ) : (
            <EmptyState.Title>{formatString(title)} not found</EmptyState.Title>
          )}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
