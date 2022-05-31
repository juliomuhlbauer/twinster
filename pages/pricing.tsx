import { Layout } from "@/marketing/layout";
import { BirdIcon } from "@/theme/icons/bird";
import { FalconIcon } from "@/theme/icons/falcon";
import { NextPageWithLayout } from "@/types/app";
import {
  Button,
  Container,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { MdCheckCircle } from "react-icons/md";

const plans = [
  {
    name: "Dodo",
    description: "Perfect for birds learning to fly.",
    icon: BirdIcon,
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: ["Pull tweets from your account", "Tweet creator"],
    action: "Get started",
  },
  {
    name: "Falcon",
    description: "Perfect for birds mastering the art to fly.",
    icon: FalconIcon,
    price: {
      monthly: 5,
      yearly: 48 / 12,
    },
    features: ["All of Dodo features", "Tweet thread", "Custom themes"],
    action: "Comming soon",
  },
];

const recurrences: ["monthly", "yearly"] = ["monthly", "yearly"];

const Pricing: NextPageWithLayout = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <Stack align="center" spacing={16}>
        <Heading size="2xl">Pricing</Heading>

        <Tabs
          variant="solid-rounded"
          defaultIndex={1}
          w="100%"
          colorScheme="primary"
          size="lg"
          align="center"
        >
          <TabList bgColor="gray.700" w="fit-content" rounded="full">
            <Tab px={8}>Monthly</Tab>
            <Tab px={8}>Yearly</Tab>
          </TabList>

          <TabPanels>
            {recurrences.map((recurrence, index) => (
              <TabPanel key={index}>
                <SimpleGrid
                  spacing={4}
                  columns={{ base: 1, md: 2 }}
                  alignItems="normal"
                  py={8}
                >
                  {plans.map((plan, index) => (
                    <Stack
                      key={index}
                      borderWidth={1}
                      borderColor="gray.600"
                      rounded="lg"
                      p={8}
                      align="center"
                      spacing={4}
                    >
                      <Stack align="center">
                        <Icon boxSize={12} as={plan.icon} color="primary.200" />
                        <Heading>{plan.name}</Heading>
                        <Heading size="lg" color="primary.200">
                          {`$${plan.price[recurrence]} /mo`}
                        </Heading>
                        <Text>{plan.description}</Text>
                      </Stack>
                      <List spacing={4}>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index} fontSize="xl">
                            <ListIcon
                              as={MdCheckCircle}
                              color="primary.200"
                              boxSize={6}
                            />
                            {feature}
                          </ListItem>
                        ))}
                      </List>
                      <Spacer />
                      <Button isDisabled={plan.action === "Comming soon"}>
                        {plan.action}
                      </Button>
                    </Stack>
                  ))}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};

Pricing.getLayout = (page) => <Layout>{page}</Layout>;

export default Pricing;
