import { FC } from "react";
import NextLink from "next/link";
import { Heading, HStack, Link } from "@chakra-ui/react";
import { TwinsterIcon } from "@/theme/icons/twinster";

interface Logo {
  link?: string;
}

export const Logo: FC<Logo> = ({ link = "/app" }) => {
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
        <Heading
          _groupHover={{
            color: "primary.200",
          }}
        >
          Twinster
        </Heading>
      </HStack>
    </NextLink>
  );
};
