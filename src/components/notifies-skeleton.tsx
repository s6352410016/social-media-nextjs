import {
  For,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
} from "@chakra-ui/react";

interface NotifiesSkeletonProps {
  amount?: number;
}

export function NotifiesSkeleton({ amount = 1 }: NotifiesSkeletonProps) {
  return (
    <VStack gapY="3.5">
      <For each={[...Array(amount).keys()]}>
        {(item) => (
          <HStack 
            key={item} 
            gap="5"
            height="70px" 
            width="full"
          >
            <SkeletonCircle size="12" />
            <Stack flex="1">
              <Skeleton height="4" />
              <Skeleton height="4" width="60%" />
              <Skeleton height="4" width="40%" />
            </Stack>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
