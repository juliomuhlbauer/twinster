import { report } from "@/lib/analytics";
import { themeColors } from "@/theme";
import { TweetProps, TweetTheme } from "@/types/twitter";
import { Center, HStack, Icon, IconButton } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FiShare } from "react-icons/fi";
import { FiCloud, FiDownload, FiMoon, FiSun } from "react-icons/fi";

const themeIcons = {
  light: FiSun,
  darkBlue: FiCloud,
  dark: FiMoon,
};

export const toDataURL = (url: string): Promise<string> =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export const TweetSettings = ({
  tweet,
  thread,
  theme,
  setTheme,
  canDownload = true,
  onThreadDownload,
}: {
  tweet?: TweetProps;
  thread?: TweetProps[];
  theme: TweetTheme;
  setTheme: Dispatch<SetStateAction<TweetTheme>>;
  canDownload?: boolean;
  onThreadDownload?: () => void;
}) => {
  const [isDownloading, setDownloading] = useState(false);

  const share = async () => {
    if (!navigator.share) return;
    if (tweet) {
      const dataUrl = await toDataURL(`/api/tweet/${tweet.id}?theme=${theme}`);

      const blob = await (await fetch(dataUrl)).blob();

      const image = new File([blob], `${tweet.id}-canvas.png`, {
        type: blob.type,
      });

      await navigator.share({
        title: tweet.id,
        text: tweet.text,
        url: `/api/tweet/${tweet.id}?theme=${theme}`,
        files: [image],
      });
    }

    if (thread) {
      const files = thread.map(async (tweet) => {
        const dataUrl = await toDataURL(
          `/api/tweet/${tweet.id}?theme=${theme}`
        );

        const blob = await (await fetch(dataUrl)).blob();

        const image = new File([blob], `${tweet.id}-canvas.png`, {
          type: blob.type,
        });

        return image;
      });

      await Promise.all(files).then((files) => {
        navigator.share({
          title: "Thread",
          text: "Thread",
          files,
        });
      });
    }
  };

  const donwload = useCallback(async () => {
    setDownloading(true);

    if (tweet) {
      const tweetImgRef = document.getElementById(`tweet-${tweet.id}`);

      if (tweetImgRef === null) {
        console.error("Could not find tweet element");
        return;
      }

      saveAs(
        "/api/tweet/" + tweet.id,
        `twinster_${tweet.text.slice(0, 20)}.png`
      );

      report("download", "tweet", tweet.id);

      setDownloading(false);
    }

    if (thread) {
      const zip = JSZip();

      const blobs = thread.map(async (tweet, index) => {
        const base64data = await toDataURL("/api/tweet/" + tweet.id).then(
          (dataUrl) =>
            zip.file(`twinster_${index + 1}.png`, dataUrl.split(",")[1], {
              base64: true,
            })
        );

        return base64data;
      });

      await Promise.all(blobs);

      zip.generateAsync({ type: "blob" }).then((blob) => {
        saveAs(blob, `twinster_${thread[0].text.slice(0, 20)}.zip`);
      });

      const id = thread[0].id;

      report("download", "thread", id);

      setDownloading(false);
      onThreadDownload && onThreadDownload();
    }
  }, [onThreadDownload, thread, tweet]);

  return (
    <Center>
      <HStack
        bgColor="bg"
        boxShadow="lg"
        p={1}
        borderRadius="lg"
        align="center"
        justify="space-around"
        pos="fixed"
        bottom={12}
        borderWidth="1px"
        borderColor="gray.700"
      >
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
          onClick={() => donwload()}
          isLoading={isDownloading}
          isDisabled={
            tweet?.id === "error" ||
            thread?.[0]?.id === "error" ||
            canDownload === false
          }
        />

        <IconButton
          size="lg"
          aria-label="Share"
          icon={<Icon as={FiShare} />}
          onClick={() => share()}
          isDisabled={
            tweet?.id === "error" ||
            thread?.[0]?.id === "error" ||
            canDownload === false
          }
        />
      </HStack>
    </Center>
  );
};
