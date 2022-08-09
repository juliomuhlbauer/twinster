import { FC } from "react";
import NextLink from "next/link";
import { Heading, HStack, Link, Stack } from "@chakra-ui/react";
import { TwinsterIcon } from "@/theme/icons/twinster";
import React from "react";

interface Logo {
  link?: string;
}

export const Logo: FC<Logo> = ({ link = "/" }) => {
  return (
    <NextLink href={link} passHref>
      <HStack
        as={Link}
        variant="button"
        p={2}
        role="group"
        _hover={{
          textDecoration: "none",
        }}
      >
        <TwinsterIcon boxSize={12} />
        <Stack align="end" spacing={0}>
          <Heading
            _groupHover={{
              color: "primary.200",
            }}
            size="xl"
          >
            twinster
          </Heading>
        </Stack>
      </HStack>
    </NextLink>
  );
};
