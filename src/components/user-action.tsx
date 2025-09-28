"use client";

import { Button, Circle, Icon, Popover, Portal, Text } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { useUserStore } from "@/providers/user-store-provider";
import { navigate } from "@/utils/helpers/router";
import { callApi } from "@/utils/helpers/call-api";
import { useCallback, useState } from "react";

export function UserAction() {
  const { user, clearUser } = useUserStore((state) => state);

  const [disabled, setDisabled] = useState(false);

  const handleProfile = useCallback((id?: string) => {
    if (id) {
      navigate(`/profile/${id}`);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setDisabled(true);
    const data = await callApi("post", "auth/logout");
    setDisabled(false);
    if (data.success || !data.success) {
      clearUser();
      navigate("/");
    }
  }, []);

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Circle
          size="11"
          bg="gray.200"
          color="black"
          cursor="pointer"
          _hover={{
            backgroundColor: "gray.300",
            transitionDuration: "slow",
          }}
        >
          <IoIosArrowDown />
        </Circle>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="200px">
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="medium" fontSize="md" marginBottom="2">
                User settings:
              </Popover.Title>

              <Button
                onClick={() => handleProfile(user?.id)}
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                px="3"
                py="6"
                my="1"
              >
                <Icon size="md" color="black">
                  <FaRegUserCircle />
                </Icon>
                <Text>Profile</Text>
              </Button>
              <Button
                onClick={handleLogout}
                disabled={disabled}
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                px="3"
                py="6"
                my="1"
              >
                <Icon size="md" color="black">
                  <IoIosLogOut />
                </Icon>
                <Text>Logout</Text>
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
