import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useState } from "react";

export default function passwordResetScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const handleOtpFilled = (otpText: string) => {
    setOtp(otpText);
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
        Password Reset
      </Text>
      <Text fontSize="$3" color="$secondary" mb="$5">
        We send a code to your email.
      </Text>

      <Stack gap="$2" width="80%">
        <OtpInput
          secureTextEntry
          numberOfDigits={6}
          onFilled={handleOtpFilled} 
          theme={{
            pinCodeTextStyle: {
              color: "black", 
            },
            pinCodeContainerStyle: {
              borderColor: "$secondary", 
            },
            focusedPinCodeContainerStyle: {
              borderColor: "$green5", 
            },
          }}
        />
      </Stack>

      <XStack width="80%" jc="center" mt="$5">
        <Button
          onPress={() => router.push("/set-new-password")}
          bg="$primary"
          padding="$3"
          borderRadius="$3"
          width="100%" 
          height={45}
          ai="center"
          jc="center"
        >
          <Text color="#fff" fontWeight="bold" fontSize="$3">
            Continue
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
