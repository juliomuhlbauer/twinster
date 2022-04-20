import { TwinsterIcon } from "@/theme/icons/twinster";
import { TweetProps } from "@/types/twitter";
import {
  AspectRatio,
  Box,
  Center,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Tweet } from "./tweet";

interface Wizard {
  dailyTweet: TweetProps;
}

const Wizard: FC<Wizard> = ({ dailyTweet }) => {
  const [link, setLink] = useState("");
  const router = useRouter();

  return (
    <Center minH="100vh">
      <Stack align="center" spacing={12} w="100%">
        <Stack align="center">
          <TwinsterIcon boxSize={16} />
          <Heading
            size="3xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Twinster
          </Heading>
        </Stack>
        <Box w="100%">
          <FormLabel>Enter a link to a tweet</FormLabel>
          <HStack w="100%">
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://twitter.com/JamesClear/status/1334334544598740994"
            />
            <IconButton
              aria-label="Fetch tweet"
              icon={<Icon as={AiOutlineArrowRight} />}
              onClick={() => {
                if (link) {
                  router.push(`/app/tweet?id=${link.slice(-19)}`);
                }
              }}
            />
          </HStack>
        </Box>
        <Stack align="center" spacing={4}>
          <Heading size="lg">Tweet of the day</Heading>
          <Box
            border="1px"
            borderRadius="lg"
            p={1}
            borderColor="gray.700"
            boxShadow="lg"
          >
            <AspectRatio ratio={4 / 2} w="lg">
              <Tweet theme="darkBlue" tweet={dailyTweet} />
            </AspectRatio>
          </Box>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Wizard;
