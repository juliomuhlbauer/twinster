import { report } from "@/lib/analytics";
import { themeColors } from "@/theme";
import { TweetTheme, TweetProps } from "@/types/twitter";
import { Center, HStack, Icon, IconButton } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { toBlob } from "html-to-image";
import JSZip from "jszip";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FiCloud, FiDownload, FiMoon, FiSun } from "react-icons/fi";

const themeIcons = {
  light: FiSun,
  darkBlue: FiCloud,
  dark: FiMoon,
};

const zip = JSZip();

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

  const onButtonClick = useCallback(async () => {
    setDownloading(true);

    if (tweet) {
      const ref = document.getElementById(`tweet-${tweet.id}`);

      if (ref === null) {
        console.error("Could not find tweet element");
        return;
      }

      await toBlob(ref, {
        canvasHeight: 1350,
        canvasWidth: 1080,
      })
        .then((blob) => {
          if (blob != null) {
            saveAs(blob, `twinster_${tweet.text.slice(0, 20)}.png`);
          }
        })
        .catch((err) => {
          console.error(err);
        });

      report("download", "tweet", tweet.id);

      setDownloading(false);
    }

    if (thread) {
      const blobs = thread.map(async (tweet, index) => {
        const ref = document.getElementById(`tweet-${tweet.id}`);

        if (ref === null) {
          console.error("Could not find tweet element");
          return;
        }

        const blob = await toBlob(ref, {
          canvasHeight: 1350,
          canvasWidth: 1080,
        })
          .then((blob) => {
            if (blob != null) {
              zip.file(`twinster_${index + 1}.png`, blob, {
                binary: true,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });

        return blob;
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
          onClick={() => onButtonClick()}
          isLoading={isDownloading}
          isDisabled={
            tweet?.id === "error" ||
            thread?.[0]?.id === "error" ||
            canDownload === false
          }
        >
          Download
        </IconButton>
      </HStack>
    </Center>
  );
};
