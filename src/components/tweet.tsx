import { themeColors } from "@/theme";
import { Theme, TweetProps } from "@/types/twitter";
import {
  Box,
  Grid,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Stack,
  ThemeTypings,
  chakra,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";

interface Tweet {
  tweet: TweetProps;
  theme: Theme;
}

export const Tweet: FC<Tweet> = ({ theme, tweet }) => {
  const { accent, bg, secondary } = themeColors[theme];

  const formattedText = tweet.text.replace(/https:\/\/[\n\S]+/g, "");

  return (
    <Box bgColor={bg}>
      <Stack p={8} spacing={4} w="100%">
        <HStack>
          <Img
            src={tweet.author.avatarUrl}
            borderRadius="full"
            boxSize={{ base: 10, sm: 12 }}
          />
          <Box>
            <Heading
              d="flex"
              gap={2}
              alignItems="center"
              lineHeight="shorter"
              fontWeight="bold"
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              textColor={accent}
            >
              {tweet.author.name}
              {tweet.author.verified ? (
                <chakra.svg
                  aria-label="Verified Account"
                  h={4}
                  w={4}
                  color={accent}
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                  </g>
                </chakra.svg>
              ) : null}
            </Heading>
            <Heading
              lineHeight="shorter"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              fontWeight="normal"
              textColor={secondary}
            >
              @{tweet.author.username}
            </Heading>
          </Box>
        </HStack>
        <Heading
          fontSize={{ base: "md", sm: "lg", md: "xl" }}
          fontWeight="medium"
          textColor={accent}
        >
          {formattedText.split("\n").map((line, i) => (
            <Fragment key={i}>
              {line}
              <br />
            </Fragment>
          ))}
        </Heading>
        {tweet.media && tweet.media.length ? (
          <SimpleGrid
            columns={tweet.media.length === 1 ? 1 : 2}
            columnGap={2}
            my={2}
          >
            {tweet.media?.map((media, i) => (
              <Img key={i} src={media?.url} rounded="2xl" />
            ))}
          </SimpleGrid>
        ) : null}
      </Stack>
    </Box>
  );
};
