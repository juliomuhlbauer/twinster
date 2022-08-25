import { themeColors } from "@/theme";
import { TwinsterIcon } from "@/theme/icons/twinster";
import { TweetTheme } from "@/types/twitter";
import { HStack, Stack, chakra } from "@chakra-ui/react";
import { FC } from "react";

export const Watermark: FC<{ theme: TweetTheme }> = ({ theme }) => {
  const { blue } = themeColors[theme];

  return (
    <HStack
      py="16px"
      px="24px"
      position="absolute"
      right={0}
      bottom={0}
      spacing="2px"
      opacity={0.75}
    >
      <TwinsterIcon boxSize="52px" />
      <Stack align="end" spacing={0}>
        <chakra.h2 fontSize="40px" fontWeight="bold" textColor={blue}>
          twinster
        </chakra.h2>
      </Stack>
    </HStack>
  );
};
