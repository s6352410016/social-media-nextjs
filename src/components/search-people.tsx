"use client";

import { useDebounce } from "@/hooks/use-debounce";
import {
  searchPeopleSchema,
  SearchPeopleSchema,
} from "@/utils/validations/search";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  Popover,
  Portal,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { People } from "./people";
import { useUsers } from "@/hooks/use-users";
import { useUserStore } from "@/providers/user-store-provider";
import { Spinner } from "./spinner";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ItemsNotFound } from "./items-not-found";
import { useInView } from "react-intersection-observer";

export function SearchPeople() {
  const { ref, inView } = useInView();

  const [open, setOpen] = useState(false);

  const handleClosePopover = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const { register, watch } = useForm<SearchPeopleSchema>({
    resolver: zodResolver(searchPeopleSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValues = watch("search");
  const { user } = useUserStore((state) => state);
  const values = useDebounce(searchValues, 500);
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useUsers(values, 10, user?.id);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Flex
      flex="1"
      display="none"
      md={{
        display: "flex",
      }}
    >
      <Popover.Root
        open={open}
        onOpenChange={(e) => handleClosePopover(e.open)}
        positioning={{ sameWidth: true }}
        autoFocus={false}
      >
        <Popover.Trigger asChild display="flex" width="full">
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input
              {...register("search")}
              placeholder="Search people"
              variant="subtle"
              autoComplete="off"
            />
          </InputGroup>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width="auto">
              <Popover.Arrow />
              <Popover.Body overflowY="auto">
                <Popover.Title
                  fontWeight="medium"
                  fontSize="md"
                  marginBottom="3"
                >
                  Search result:
                </Popover.Title>
                {isLoading ? (
                  <Flex
                    width="full"
                    height="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Spinner size="lg" />
                  </Flex>
                ) : !users?.pages.length ? (
                  <ItemsNotFound title="user" />
                ) : (
                  users &&
                  users.pages.map((group, i) => (
                    <Fragment key={i}>
                      {group.users.length ? (
                        group.users.map((user) => (
                          <People
                            key={user.id}
                            onClosePopover={handleClosePopover}
                            user={user}
                          />
                        ))
                      ) : (
                        <ItemsNotFound title="user" />
                      )}
                    </Fragment>
                  ))
                )}

                {isFetchingNextPage && <Spinner size="lg" />}
                <Box ref={ref} />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Flex>
  );
}
