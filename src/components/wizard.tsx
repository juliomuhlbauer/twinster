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
  chakra,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Tweet } from "./tweet";

interface Wizard {
  dailyTweet: TweetProps;
}

const findId = (link: string) => {
  if (link.includes("https://twitter.com/")) {
    const url = new URL(link);
    const idIndex =
      url.pathname.split("/").findIndex((path) => path === "status") + 1;
    const id = url.pathname.split("/")[idIndex];

    return id;
  } else {
    const id = link;

    return id;
  }
};

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

        <chakra.form
          w="100%"
          onSubmit={(e) => {
            e.preventDefault();
            if (link) {
              router.push({
                pathname: "/app/tweet",
                query: {
                  id: findId(link),
                },
              });
            }
          }}
        >
          <FormLabel htmlFor="link">Enter a link to a tweet</FormLabel>
          <HStack w="100%">
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://twitter.com/JamesClear/status/1334334544598740994"
            />
            <IconButton
              type="submit"
              aria-label="Fetch tweet"
              icon={<Icon as={AiOutlineArrowRight} />}
            />
          </HStack>
        </chakra.form>

        <Stack align="center" spacing={4}>
          <Heading size="lg">Tweet of the day</Heading>
          <Box
            border="1px"
            borderRadius="lg"
            p={1}
            borderColor="gray.700"
            boxShadow="lg"
          >
            <AspectRatio
              ratio={4 / 2}
              w={{ base: "xs", sm: "md", md: "lg" }}
              maxW="lg"
            >
              <Tweet theme="darkBlue" tweet={dailyTweet} />
            </AspectRatio>
          </Box>
          <Button
            onClick={() => {
              router.push({
                pathname: "/app/tweet",
                query: {
                  id: dailyTweet.id,
                },
              });
            }}
          >
            Try it
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Wizard;
