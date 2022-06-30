import { NoSSR } from "@/components/no-ssr";
import { Tweet } from "@/components/tweet";
import { TweetSettings } from "@/components/tweet/settings";
import { Layout } from "@/layout";
import { getThread } from "@/lib/twitter";
import { NextLayoutComponentType } from "@/types/app";
import { Theme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { missingIDTweet, thread7Days } from "@/utils/tweets";
import {
  Box,
  Center,
  Heading,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  Icon,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

interface Editor {
  thread: TweetProps[];
}

const ThreadEditor: NextLayoutComponentType<Editor> = ({ thread }) => {
  const [theme, setTheme] = useState<Theme>("darkBlue");
  const [canDownload, setCanDownload] = useState(false);

  const [isBeta, setBeta] = useLocalStorage("beta-acces", false);
  const [threadsDownloaded, setThreadsDownloaded] = useLocalStorage(
    "threads-downloaded",
    0
  );
  const [threadsDownloadedResetAt, setThreadsDownloadedResetAt] =
    useLocalStorage("threads-downloaded-reset-at", new Date());

  const threadsDownloadedResetAtKey: Date = useReadLocalStorage(
    "threads-downloaded-reset-at"
  ) as Date;

  useEffect(() => {
    if (threadsDownloaded < 1 || (isBeta && threadsDownloaded < 10)) {
      setCanDownload(true);
    }

    if (threadsDownloaded && !threadsDownloadedResetAtKey) {
      // setThreadsDownloadedResetAt(
      setThreadsDownloadedResetAt(new Date());
    }

    if (!threadsDownloadedResetAtKey) return;

    if (
      new Date(threadsDownloadedResetAtKey).getMonth() !== new Date().getMonth()
    ) {
      setThreadsDownloaded(0);
      setThreadsDownloadedResetAt(new Date());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBeta, threadsDownloadedResetAt]);

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
                  {isBeta ? 10 - threadsDownloaded : 1 - threadsDownloaded}{" "}
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

          {thread.map((tweet, index) => (
            <Box key={tweet.id} p={2} borderWidth="1px" borderRadius="lg">
              <Box id={`tweet-${tweet.id}`}>
                <Tweet theme={theme} tweet={tweet} aspect="4:5" />
              </Box>
            </Box>
          ))}
        </Stack>
      </Center>
      <TweetSettings
        theme={theme}
        setTheme={setTheme}
        thread={thread}
        canDownload={canDownload}
        setThreadsDownloaded={setThreadsDownloaded}
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
