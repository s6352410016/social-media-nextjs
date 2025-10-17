import {
  For,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
} from "@chakra-ui/react";

interface UsersSkeletonProps {
  amount?: number;
  height?: string;
}

export function UsersSkeleton({ amount = 1, height = "70px" }: UsersSkeletonProps) {
  return (
    <VStack gapY="3.5" width="full">
      <For each={[...Array(amount).keys()]}>
        {(item) => (
          <HStack 
            key={item} 
            gap="5"
            height={height}
            width="full"
          >
            <SkeletonCircle size="12" />
            <Stack flex="1">
              <Skeleton height="4" />
              <Skeleton height="4" width="80%" />
            </Stack>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
