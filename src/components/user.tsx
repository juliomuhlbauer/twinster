import {
  Avatar,
  Box,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";

interface User {
  user: Session["user"];
}

export const User: FC<User> = ({ user }) => {
  return (
    <Box>
      <Menu placement="bottom-end" isLazy>
        <MenuButton
          as={Avatar}
          cursor="pointer"
          ring={2}
          ringColor="accent"
          {...(user?.image && {
            src: user.image,
          })}
          {...(user?.name && {
            name: user.name,
          })}
        />

        <MenuList bgColor="bg">
          <MenuGroup title="Profile" fontSize="lg" fontWeight="bold">
            <MenuItem>
              <HStack spacing={4}>
                <Avatar
                  ring={2}
                  ringColor="accent"
                  {...(user?.image && {
                    src: user.image,
                  })}
                  {...(user?.name && {
                    name: user.name,
                  })}
                  objectFit="contain"
                />
                <Text fontSize="lg" fontWeight="semibold">
                  {user?.name}
                </Text>
              </HStack>
            </MenuItem>
          </MenuGroup>

          {/* <MenuDivider /> */}

          {/* <MenuItem closeOnSelect={false}>
            <HStack justify="space-between" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                Theme
              </Text>
              <Button
                colorScheme="primary"
                aria-label="Toggle color mode"
                onClick={toggleColorMode}
                leftIcon={
                  <Icon
                    as={colorMode === "light" ? BsFillSunFill : BsFillMoonFill}
                  />
                }
              >
                {colorMode === "light" ? "Light" : "Dark"}
              </Button>
            </HStack>
          </MenuItem> */}

          <MenuDivider />

          <MenuItem
            icon={<Icon as={FiLogOut} boxSize={5} />}
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
