import { Tweet } from "@/components/tweet";
import { Layout } from "@/layout";
import { events } from "@/lib/analytics";
import { NextPageWithLayout } from "@/types/next";
import { findTweetId } from "@/utils/find-tweet-id";
import { welcomeTweet } from "@/utils/tweets";
import {
  Box,
  chakra,
  Container,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Tab,
  TabList,
  Tabs,
  Tag,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { event } from "nextjs-google-analytics";
import { useState } from "react";
import { FiArrowRight, FiSearch } from "react-icons/fi";

const types: ["tweet", "thread"] = ["tweet", "thread"];

const Editor: NextPageWithLayout = () => {
  const [inputFocus, setInputFocus] = useState(false);

  const [link, setLink] = useState("");
  const [type, setType] = useState<"tweet" | "thread">("tweet");

  const router = useRouter();

  const fetchTweet = () => {
    if (link) {
      const id = findTweetId(link);

      if (type === "tweet") {
        events.fetchTweet(id);
      } else if (type === "thread") {
        events.fetchThread(id);
      }

      router.push({
        pathname: "/" + type,
        query: {
          id: id,
        },
      });
    }
  };

  return (
    <>
      <Container py={{ lg: 12 }}>
        <Stack align="center" spacing={8}>
          <Stack align="center" spacing={4}>
            <Tabs
              index={types.indexOf(type)}
              onChange={(index) => setType(types[index])}
              colorScheme="primary"
              variant="soft-rounded"
              isFitted
              w="100%"
            >
              <TabList
                borderRadius="full"
                borderWidth={2}
                borderColor="#76E4F7"
              >
                {types.map((type) => (
                  <Tab
                    key={type}
                    id={type}
                    fontWeight="medium"
                    color="gray.400"
                    _selected={{
                      bgColor: "#76E4F7",
                      color: "primary.900",
                    }}
                  >
                    {type === "tweet" ? (
                      "Tweet"
                    ) : (
                      <>
                        Thread
                        <Tag mx={2}>beta</Tag>
                      </>
                    )}
                  </Tab>
                ))}
              </TabList>
            </Tabs>

            <chakra.form
              onSubmit={(e) => {
                e.preventDefault();
                fetchTweet();
              }}
            >
              <HStack w="100%" role="group">
                <InputGroup>
                  <InputLeftElement>
                    <Icon
                      as={FiSearch}
                      boxSize={6}
                      color={inputFocus ? "#76E4F7" : "whiteAlpha.500"}
                    />
                  </InputLeftElement>
                  <Input
                    aria-label="Tweet link"
                    name="link"
                    borderRadius="full"
                    w={{ md: "xl" }}
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder={
                      type === "tweet"
                        ? "enter a tweet link"
                        : "enter the first tweet link"
                    }
                    focusBorderColor="#76E4F7"
                    _placeholder={{
                      color: "whiteAlpha.500",
                    }}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                  />
                  <InputRightElement>
                    <IconButton
                      type="submit"
                      aria-label="search"
                      icon={<Icon as={FiArrowRight} />}
                      borderRadius="full"
                      variant="ghost"
                      color={inputFocus ? "#76E4F7" : "whiteAlpha.500"}
                    />
                  </InputRightElement>
                </InputGroup>
              </HStack>
            </chakra.form>
          </Stack>

          <Box
            border="1px"
            borderRadius="lg"
            p={1}
            borderColor="gray.700"
            boxShadow="lg"
          >
            <Tweet theme="darkBlue" tweet={welcomeTweet} aspect="4:3" />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

Editor.getLayout = function getLayout(page) {
  return <Layout isAppHome>{page}</Layout>;
};

export default Editor;
