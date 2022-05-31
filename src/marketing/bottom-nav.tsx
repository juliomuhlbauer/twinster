import { navLinks } from "@/data/links";
import {
  Button,
  Center,
  Container,
  HStack,
  Icon,
  Link,
  StackDivider,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const BottomNav = () => {
  return (
    <Center
      display={{ base: "flex", md: "none" }}
      maxW="container.lg"
      pos="sticky"
      bottom={0}
      p={4}
    >
      <HStack
        bgColor="bg"
        boxShadow="lg"
        p={1}
        borderRadius="lg"
        align="center"
        justify="space-around"
        // w="sm"
        borderWidth="1px"
        borderColor="gray.700"
        // divider={<StackDivider />}
      >
        {navLinks.map((link, index) => (
          <NextLink href={link.url} passHref key={index}>
            <Button
              as={Link}
              leftIcon={<Icon as={link.icon} />}
              fontSize="lg"
              fontWeight="semibold"
              variant="ghost"
            >
              {link.name}
            </Button>
          </NextLink>
        ))}
      </HStack>
    </Center>
  );
};
