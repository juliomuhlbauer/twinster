import { Tweet } from "@/components/tweet";
import { Layout } from "@/layout";
import { getTweet } from "@/lib/twitter";
import { themeColors } from "@/theme";
import { NextLayoutComponentType } from "@/types/app";
import { Theme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { missingIDTweet } from "@/utils/tweets";
import {
  AspectRatio,
  Box,
  Center,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Select,
  Stack,
} from "@chakra-ui/react";
import { toPng } from "html-to-image";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useCallback, useRef, useState } from "react";
import { FiCloud, FiDownload, FiMoon, FiSun } from "react-icons/fi";

interface Editor {
  tweet: TweetProps;
  session: Session;
}

const themeIcons = {
  light: FiSun,
  darkBlue: FiCloud,
  dark: FiMoon,
};

const Editor: NextLayoutComponentType<Editor> = ({ tweet }) => {
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
      <NextSeo title="Editor" />

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
        </Stack>
      </Center>
      <Center>
        <HStack
          // bgColor="bg"
          boxShadow="lg"
          p={1}
          borderRadius="lg"
          align="center"
          justify="space-around"
          pos="fixed"
          bottom={12}
          // w="sm"
          borderWidth="1px"
          borderColor="gray.700"
        >
          {/* <Box>
            <FormLabel>Theme</FormLabel>
            <Select
              value={theme}
              onChange={(e) => {
                const newTheme = e.target.value as Theme;
                setTheme(newTheme);
              }}
            >
              <option value="light">Light</option>
              <option value="darkBlue">Dark Blue</option>
              <option value="dark">Dark</option>
            </Select>
          </Box> */}
          <IconButton
            size="lg"
            aria-label="Change theme"
            onClick={() => {
              const newTheme =
                theme === "light"
                  ? "darkBlue"
                  : theme === "darkBlue"
                  ? "dark"
                  : "light";
              setTheme(newTheme);
            }}
            bgColor={themeColors[theme].bg}
            color={themeColors[theme].accent}
            _hover={{
              bgColor: themeColors[theme].bg,
            }}
            icon={<Icon as={themeIcons[theme]} />}
          />

          <IconButton
            size="lg"
            aria-label="Download"
            icon={<Icon as={FiDownload} />}
            onClick={() => onButtonClick()}
            isLoading={isDownloading}
            isDisabled={tweet.id === "error"}
          >
            Download
          </IconButton>
        </HStack>
      </Center>
    </>
  );
};

Editor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Editor;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const link = context.query.id as string;

  const id = findTweetId(link);

  let tweet = missingIDTweet;

  const session = await getSession(context);

  // console.log(session);

  if (id) {
    try {
      tweet = await getTweet(id);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    props: {
      tweet,
    },
  };
};
