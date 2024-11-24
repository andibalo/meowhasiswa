import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function setNewPasswordScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$background">
      <YStack mb="$1" ai="center">
        <Image
          source={require("../assets/images/meow-logo.png")}
          width={260}
          height={260}
          objectFit="contain"
        />
      </YStack>
      <Text fontSize="$9" fontWeight="bold" color="$color" mb="$5">
        Set New Password
      </Text>
  
      <Stack gap="$2" width="80%">
        <Text fontSize="$3" color="$color" mt="$3">
          Password
        </Text>
        <Input
          placeholder="Enter your new password"
          secureTextEntry
          bg="$backgroundSoft"
          padding="$3"
          borderRadius="$2"
        />
      </Stack>

      <Stack gap="$2" width="80%">
        <Text fontSize="$3" color="$color" mt="$3">
          Confirm Password
        </Text>
        <Input
          placeholder="Confirm your new password"
          secureTextEntry
          bg="$backgroundSoft"
          padding="$3"
          borderRadius="$2"
        />
      </Stack>

      <XStack width="80%" jc="center" mt="$5">
        <Button
          onPress={() => router.push("/all-done")}
          bg="$primary"
          padding="$3"
          borderRadius="$3"
          width="100%"
          height={45}
          ai="center"
          jc="center"
        >
          <Text color="#fff" fontWeight="bold" fontSize="$3">
            Reset Password
          </Text>
        </Button>
      </XStack>

      <XStack mt="$3" ai="center">
        <Text fontSize="$3" color="$color">
          Back to
        </Text>
        <Text
          fontWeight="bold"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("login");
          }}
          style={{ textDecorationLine: "underline" }}
          ml="$2"
        >
          Login
        </Text>
      </XStack>
    </YStack>
  );
}
