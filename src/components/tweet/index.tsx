import { themeColors } from "@/theme";
import { Theme, TweetProps } from "@/types/twitter";
import {
  Box,
  Center,
  chakra,
  HStack,
  SimpleGrid,
  Stack,
  useDimensions,
} from "@chakra-ui/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Watermark } from "./watermark";

interface Tweet {
  tweet: TweetProps;
  theme: Theme;
  aspect: "1:1" | "4:5" | "4:3";
  isStatic?: boolean;
  watermark?: boolean;
}

const aspects = {
  "1:1": {
    width: 1,
    height: 1,
  },
  "4:5": {
    width: 1,
    height: 1.25,
  },
  "4:3": {
    width: 1,
    height: 0.75,
  },
};

export const Tweet: FC<Tweet> = ({
  theme,
  tweet,
  aspect = "4:5",
  isStatic = false,
  watermark = false,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const textDimensions = useDimensions(textRef);

  const [mediaHeight, setMediaHeight] = useState(0);

  const { accent, bg, secondary } = themeColors[theme];

  const formattedText = tweet.text.replace(/https:\/\/[\n\S]+/g, "");

  const width = aspects[aspect].width;
  const height = aspects[aspect].height;

  useEffect(() => {
    if (textDimensions) {
      const contentHeight = height * 1080 - 180 - 24;
      const textHeight = textDimensions.borderBox.height;

      setMediaHeight(contentHeight - textHeight);
    }
  }, [textDimensions, height]);

  return (
    <Box position="relative">
      <Center
        sx={{
          zoom: isStatic
            ? 1
            : {
                base: 0.3,
                sm: 0.4,
                md: 0.5,
              },
        }}
        bgColor={bg}
        p="90px"
        w={width * 1080 + "px"}
        maxW={width * 1080 + "px"}
        h={height * 1080 + "px"}
        maxH={height * 1080 + "px"}
      >
        <Stack spacing="24px">
          <Stack ref={textRef} spacing="24px">
            <HStack align="center" spacing="24px">
              <chakra.img
                src={tweet.author.avatarUrl}
                alt="avatar"
                borderRadius="full"
                boxSize="120px"
              />
              <Stack spacing="4px">
                <chakra.h3
                  fontSize="32px"
                  lineHeight="38px"
                  fontWeight="bold"
                  textColor={accent}
                  noOfLines={1}
                  display="inline-flex"
                  alignItems="center"
                >
                  {tweet.author.name}

                  {tweet.author.verified ? (
                    <chakra.svg
                      mx="4px"
                      aria-label="Verified Account"
                      boxSize="32px"
                      color={accent}
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </g>
                    </chakra.svg>
                  ) : null}
                </chakra.h3>

                <chakra.h4
                  fontSize={"32px"}
                  lineHeight={"38px"}
                  fontWeight="normal"
                  textColor={secondary}
                  noOfLines={1}
                >
                  @{tweet.author.username}
                </chakra.h4>
              </Stack>
            </HStack>
            <chakra.p
              fontSize={"38px"}
              lineHeight={"52px"}
              fontWeight="medium"
              textColor={accent}
            >
              {formattedText.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </chakra.p>
          </Stack>

          {tweet.media && tweet.media.length ? (
            <SimpleGrid
              columns={tweet.media.length === 1 ? 1 : 2}
              spacing="16px"
              alignSelf="center"
              alignContent="center"
            >
              {tweet.media?.map((media, index) => (
                <chakra.img
                  key={index}
                  src={media?.url}
                  alt={media?.alt_text || "media-" + index}
                  maxH={
                    tweet.media.length > 2
                      ? mediaHeight / 2 - 12 + "px"
                      : mediaHeight + "px"
                  }
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  rounded="2xl"
                />
              ))}
            </SimpleGrid>
          ) : null}
        </Stack>
      </Center>

      {watermark && <Watermark />}
    </Box>
  );
};
