import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

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
import { NoSSR } from "./no-ssr";

export const Beta = () => {
  const [isBeta, setBeta] = useLocalStorage("beta-acces", false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState("");

  const password = "dodo";

  return (
    <>
      <NoSSR>
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
        <ModalContent>
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
            <Button
              onClick={() => {
                if (input === password) {
                  setBeta(true);
                  onClose();
                }
              }}
            >
              Enter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
