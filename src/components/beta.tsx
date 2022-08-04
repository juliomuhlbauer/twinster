import { useState } from "react";

import {
  Box,
  Button,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { NoSSR } from "./no-ssr";
import { useBeta } from "@/hooks/use-beta";

export const Beta = () => {
  const isBeta = useBeta((state) => state.isBeta);
  const resetBeta = useBeta((state) => state.resetBeta);
  const activateUser = useBeta((state) => state.activateUser);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState("");

  const toast = useToast();

  const password = "dodo";

  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      <NoSSR>
        {isDev && <Button onClick={() => resetBeta()}>Reset beta</Button>}
        {isBeta ? (
          <Tag size="lg" colorScheme="primary">
            beta user
          </Tag>
        ) : (
          <Button colorScheme="primary" onClick={onOpen}>
            beta
          </Button>
        )}
      </NoSSR>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={() => {
            if (input === password) {
              activateUser();
              onClose();
              toast({
                title: "Beta user activated.",
                description: "You can now download 10 threads per month.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }
          }}
        >
          <ModalHeader>Beta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Stack>
                <Text>
                  Twinster is currently in beta version, to test the beta
                  version fill out the form clicking the button below.
                </Text>
                <Button
                  as={Link}
                  href="https://forms.gle/LfxJTG3MacTJX4FM9"
                  isExternal
                  colorScheme="primary"
                >
                  Beta form
                </Button>
              </Stack>
              <Box>
                <FormLabel>Beta password</FormLabel>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit">Enter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
