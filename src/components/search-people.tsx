"use client";

import { useDebounce } from "@/hooks/use-debounce";
import {
  searchPeopleSchema,
  SearchPeopleSchema,
} from "@/utils/validations/search";
import { Input, InputGroup, Popover, Portal, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { People } from "./people";
import { useFindUsers } from "@/hooks/use-find-users";
import { useUserStore } from "@/providers/user-store-provider";

export function SearchPeople() {
  const { register, watch } = useForm<SearchPeopleSchema>({
    resolver: zodResolver(searchPeopleSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValues = watch("search");
  const { user } = useUserStore((state) => state);
  const values = useDebounce(searchValues, 500);
  const users = useFindUsers(values, user?.id);

  return (
    <Popover.Root positioning={{ sameWidth: true }} autoFocus={false}>
      <Popover.Trigger
        asChild
        display="flex"
        width="full"
      >
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
            <Popover.Body>
              <Popover.Title 
                fontWeight="medium" 
                fontSize="md"
                marginBottom="3"
              >
                Search result:
              </Popover.Title>
              {users.length ? (
                <People users={users} />
              ) : (
                <Text 
                  my="4" 
                  textAlign="center"
                  fontSize="md"
                >
                  Not found peoples
                </Text>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
