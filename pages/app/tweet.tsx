import { Tweet } from "@/components/tweet";
import { getTweet } from "@/lib/twitter";
import { Theme, TweetProps } from "@/types/twitter";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FC, useCallback, useRef, useState } from "react";
import NextLink from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toPng } from "html-to-image";
import { TwinsterIcon } from "@/theme/icons/twinster";

const missingIDTweet = {
  id: "error",
  author: {
    name: "Twinster",
    username: "twinster_app",
    avatarUrl: "/twinster_social.svg",
    verified: true,
  },
  text: "No tweet found. Try another link.",
  media: [],
};

interface Editor {
  tweet: TweetProps;
}

const Editor: FC<Editor> = ({ tweet }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<Theme>("darkBlue");
  const [isDownloading, setDownloading] = useState(false);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    setDownloading(true);

    toPng(ref.current, {
      canvasHeight: 1080,
      canvasWidth: 1080,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `twinster_${tweet.id}.png`;
        link.href = dataUrl;
        link.click();
        setDownloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tweet]);

  return (
    <>
      <HStack
        py={2}
        px={8}
        spacing={6}
        borderBottomWidth="1px"
        borderColor="gray.600"
      >
        <NextLink href="/app" passHref>
          <IconButton
            icon={<Icon as={AiOutlineArrowLeft} />}
            aria-label="Return"
          />
        </NextLink>

        <NextLink href="/app" passHref>
          <HStack as={Link} variant="button" p={2} textDecoration="none">
            <TwinsterIcon boxSize={12} />
            <Heading>Twinster</Heading>
          </HStack>
        </NextLink>
      </HStack>

      <Center py={4}>
        <Stack spacing={4}>
          <Box p={2} borderWidth="1px" borderRadius="lg">
            <Box ref={ref}>
              <AspectRatio
                ratio={1 / 1}
                w={{ base: "xs", sm: "md", md: "lg" }}
                maxW="lg"
              >
                <Tweet theme={theme} tweet={tweet} />
              </AspectRatio>
            </Box>
          </Box>

          <Box>
            <FormLabel>Theme</FormLabel>
            <RadioGroup
              value={theme}
              onChange={(value) => {
                const newTheme = value as Theme;
                setTheme(newTheme);
              }}
            >
              <Stack direction="row">
                <Radio value="light">Light</Radio>
                <Radio value="darkBlue">Dark Blue</Radio>
                <Radio value="dark">Dark</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Button
            onClick={() => onButtonClick()}
            isLoading={isDownloading}
            isDisabled={tweet.id === "error"}
          >
            Download
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default Editor;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;

  if (!id) {
    return {
      props: {
        tweet: missingIDTweet,
      },
    };
  }

  try {
    const tweet = await getTweet(id);
    return {
      props: {
        tweet,
      },
    };
  } catch (e) {
    return {
      props: {
        tweet: missingIDTweet,
      },
    };
  }
};
