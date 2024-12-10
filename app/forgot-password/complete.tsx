import { Button, Text, YStack, XStack, Image } from "tamagui";
import { useRouter } from "expo-router";

export default function ForgotPasswordCompleteScreen() {
  const router = useRouter();

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$background">
      <YStack mb="$1" ai="center">
        <Image
          source={
            {
              uri: 'https://meowhasiswa-59cc5f49-f82b-4998-af05-368c90f07a20.s3.ap-southeast-1.amazonaws.com/meow-logo.png',
              width: 260,
              height: 260,
            }
          }
          width={260}
          height={260}
          objectFit="contain"
        />
      </YStack>
      <Text fontSize="$9" fontWeight="bold" color="$color" mb="$2">
        All Done!
      </Text>
      <Text fontSize="$3" color="$secondary" mb="$5">
        Your password has been reset.
      </Text>
      <XStack width="80%" jc="center" mt="$5">
        <Button
          onPress={() => router.push("/login")}
          bg="$primary"
          padding="$3"
          borderRadius="$3"
          width="100%"
          height={45}
          ai="center"
          jc="center"
        >
          <Text color="#fff" fontWeight="bold" fontSize="$3">
            Back to login screen
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
