import {
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <Container maxW="container.lg" id="contact">
      <HStack
        mt={24}
        py={4}
        pb={8}
        borderTopWidth={1}
        borderColor="gray.600"
        justify="space-between"
      >
        <Heading size="md" fontWeight="medium">
          Twinster © {new Date().getFullYear()}
        </Heading>
        <IconButton
          as={Link}
          href="https://twitter.com/twinster_app"
          icon={<Icon as={FaTwitter} boxSize={6} />}
          aria-label="Twitter"
          isExternal
          rounded="full"
          colorScheme="primary"
          variant="ghost"
        />
      </HStack>
    </Container>
  );
};
