import { NoSSR } from "@/components/no-ssr";
import { Tweet } from "@/components/tweet";
import { TweetSettings } from "@/components/tweet/settings";
import { useBeta } from "@/hooks/use-beta";
import { Layout } from "@/layout";
import { getThread } from "@/lib/twitter";
import { NextLayoutComponentType } from "@/types/app";
import { Theme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import {
  errorTweet,
  missingIDTweet,
  thread7Days,
  welcomeTweet,
} from "@/utils/tweets";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Circle,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Editor {
  thread: TweetProps[];
}

const ThreadEditor: NextLayoutComponentType<Editor> = ({ thread }) => {
  const [theme, setTheme] = useState<Theme>("darkBlue");
  const [activeSlide, setActiveSlide] = useState(0);

  const isBeta = useBeta((state) => state.isBeta);
  const threads = useBeta((state) => state.threads);
  const resetThreadDownloaded = useBeta((state) => state.resetThreadDownloaded);
  const onThreadDownload = useBeta((state) => state.onThreadDownload);

  const canDownload: boolean = useMemo(
    () => isBeta && threads.downloaded < 10,
    [isBeta, threads.downloaded]
  );

  useEffect(() => {
    if (threads.resetedMonth !== new Date().getMonth()) {
      resetThreadDownloaded();
    }
  }, [resetThreadDownloaded, threads.resetedMonth]);

  const nextSlide = () => {
    if (activeSlide + 1 === thread.length) {
      setActiveSlide(0);
    } else {
      setActiveSlide((active) => active + 1);
    }
  };

  const previousSlide = () => {
    if (activeSlide === 0) {
      setActiveSlide(thread.length - 1);
    } else {
      setActiveSlide((active) => active - 1);
    }
  };

  return (
    <>
      <NextSeo title="Thread" />

      <Center>
        <Stack spacing={4} align="center" mb={48}>
          <Heading size="md"></Heading>

          <NoSSR>
            <Alert status="warning">
              <Stack align="center">
                <AlertIcon mr={0} boxSize={6} />
                <AlertTitle>
                  You can download{" "}
                  {isBeta ? 10 - threads.downloaded : 1 - threads.downloaded}{" "}
                  threads this month.
                </AlertTitle>
                <AlertDescription>
                  If you want to increase your download limit, you can fill the
                  form below.
                </AlertDescription>
                <Button
                  as={Link}
                  href="https://forms.gle/LfxJTG3MacTJX4FM9"
                  isExternal
                  colorScheme="primary"
                  aria-label="Beta form"
                  size="sm"
                >
                  Beta forms
                </Button>
              </Stack>
            </Alert>
          </NoSSR>

          <HStack>
            <IconButton
              aria-label="previous"
              display="none"
              sx={{
                "@media(pointer: fine)": {
                  display: "block",
                },
              }}
              icon={<Icon as={FiArrowLeft} />}
              onClick={() => previousSlide()}
            />
            <HStack
              // maxW={generateSizes((1 * 1080) / 4, "px")}
              overflow="auto"
              scrollSnapType="x mandatory"
            >
              {thread.map((tweet, index) => (
                <Box
                  key={index}
                  scrollSnapAlign="center"
                  scrollSnapStop="always"
                  //  p={2} borderWidth="1px" borderRadius="lg"
                >
                  <Box id={`tweet-${index}`}>
                    <Tweet theme={theme} tweet={tweet} aspect="4:5" />
                  </Box>
                </Box>
              ))}
            </HStack>
            <IconButton
              aria-label="next"
              display="none"
              sx={{
                "@media(pointer: fine)": {
                  display: "block",
                },
              }}
              onClick={() => nextSlide()}
              icon={<Icon as={FiArrowRight} />}
            />
          </HStack>

          <HStack>
            {thread.map((tweet, index) => {
              return (
                <Circle
                  size={2}
                  key={index}
                  bgColor={activeSlide === index ? "primary.200" : "gray.500"}
                  onClick={() => setActiveSlide(index)}
                />
              );
            })}
          </HStack>
        </Stack>
      </Center>
      <TweetSettings
        theme={theme}
        setTheme={setTheme}
        thread={thread}
        canDownload={canDownload}
        onThreadDownload={onThreadDownload}
      />
    </>
  );
};

ThreadEditor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ThreadEditor;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const link = context.query.id as string;

  const id = findTweetId(link);

  let thread = [];

  thread[0] = missingIDTweet;

  if (id) {
    try {
      thread = await getThread(id);
    } catch (err) {
      console.error(err);
      thread[0] = thread7Days;
    }
  }

  return {
    props: {
      thread,
    },
  };
};
