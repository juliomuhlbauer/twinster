import { TwinsterIcon } from "@/theme/icons/twinster";
import { HStack, Stack, chakra } from "@chakra-ui/react";

export const Watermark = () => {
  return (
    <HStack
      p={2}
      position="absolute"
      right={0}
      bottom={0}
      spacing={1}
      opacity={0.75}
    >
      <TwinsterIcon boxSize="24px" />
      <Stack align="end" spacing={0}>
        <chakra.h2 fontSize="16px" fontWeight="semibold">
          twinster
        </chakra.h2>
      </Stack>
    </HStack>
  );
};
