import { TwinsterIcon } from "@/theme/icons/twinster";
import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { FC } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { User } from "../components/user";
import { Logo } from "./logo";

interface Header {
  isAppHome?: boolean;
}

export const Header: FC<Header> = ({ isAppHome = false }) => {
  const { data: session } = useSession();

  return (
    <Container maxW="container.xl">
      <HStack
        justify="space-between"
        py={2}
        borderBottomWidth={1}
        borderColor="gray.600"
      >
        <HStack spacing={{ base: 2, md: 6 }}>
          {!isAppHome && (
            <NextLink href="/" passHref>
              <IconButton
                icon={<Icon as={AiOutlineArrowLeft} />}
                aria-label="Return"
                variant="outline"
              />
            </NextLink>
          )}

          <Logo />
        </HStack>

        {session && <User user={session?.user} />}
      </HStack>
    </Container>
  );
};
