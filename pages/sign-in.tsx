import { Button, Center, Container, Heading, Stack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaTwitter } from "react-icons/fa";

const SignIn = () => {
  return (
    <Center minH="100vh">
      <Container centerContent>
        <Stack
          px={16}
          py={8}
          w="fit-content"
          align="center"
          borderWidth={1}
          borderRadius="lg"
          borderColor="gray.600"
          spacing={8}
        >
          <Heading>Sign-in</Heading>
          <Button
            onClick={() => signIn("twitter")}
            colorScheme="twitter"
            leftIcon={<FaTwitter />}
          >
            Sign In with Twitter
          </Button>
        </Stack>
      </Container>
    </Center>
  );
};

export default SignIn;
