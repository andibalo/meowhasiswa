import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function BannedUserScreen() {
  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$red9">
      <YStack mb="$4" ai="center">
        <FontAwesome6 name="triangle-exclamation" size={100} color="$primary" />
      </YStack>
      <Text
        fontSize="$9"
        fontWeight="bold"
        color="$color"
        mb="$2"
        textAlign="center"
      >
        This Account Has Been Banned.
      </Text>
      <Stack gap="$2" width="80%">
        <Text fontSize="$4" color="$color" mb="$1" textAlign="center">
          Due to your recent action you have been banned. If you wish to appeal,
          please contact admin for further information.
        </Text>
      </Stack>
    </YStack>
  );
}
