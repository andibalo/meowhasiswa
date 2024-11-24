import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleResetPassword = () => {
    console.log(`Reset password pressed. Email: ${email}`);
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    router.push({
      pathname: "/password-reset",
      params: { email },
    });
  };

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
      <Text fontSize="$9" fontWeight="bold" color="$color" mb="$2">
        Forgot Password?
      </Text>
      <Text fontSize="$3" color="$secondary" mb="$5">
        No worries, we'll send you reset instructions.
      </Text>
      <Stack gap="$2" width="80%">
        <Text fontSize="$3" color="$color" mt="$3">
          Email
        </Text>
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          bg="$backgroundSoft"
          padding="$3"
          borderRadius="$2"
          autoCapitalize="none"
        />
      </Stack>
      <XStack width="80%" jc="center" mt="$5">
        <Button
          onPress={handleResetPassword}
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
            router.push("/login");
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
