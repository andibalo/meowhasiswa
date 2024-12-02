import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useState, useCallback } from "react";
import { useVerifyEmailMutation } from "redux/api";
import { IVerifyEmailRequest } from "types/request/auth";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface VerifyEmailProps {
  verifyemail: IVerifyEmailRequest;
  is_email_verified?: boolean;
}

export default function VerifyEmailScreen({
  verifyemail,
  is_email_verified,
}: VerifyEmailProps) {
  //const { verifyemail } = props; // Access the prop
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [isInputWrong, setIsInputWrong] = useState(false);
  const [verifyEmail] = useVerifyEmailMutation();
  const shakeTranslateX = useSharedValue(0);

  const setIsInputWrongToFalse = () => setIsInputWrong(false);

  const shake = useCallback(() => {
    const translationVal = 10;
    const timingConfig = {
      duration: 80,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
    };

    shakeTranslateX.value = withSequence(
      withTiming(translationVal, timingConfig),
      withTiming(-translationVal, timingConfig),
      withSpring(0, { mass: 0.5 }, () => {
        runOnJS(setIsInputWrongToFalse)();
      })
    );
  }, []);

  const rShakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeTranslateX.value }],
  }));

  const handleOtpFilled = async (otpText: string) => {
    setOtp(otpText);

    if (otpText === String(verifyemail.code)) {
      try {
        console.log("Submitting OTP verification with data:", {
          email: verifyemail.email,
          code: verifyemail.code,
        });
        await verifyEmail({
          email: verifyemail.email,
          code: verifyemail.code,
        }).unwrap();
        router.push("/login");
      } catch (error) {
        console.error("Verification error:", error);
        setAttemptCount((prev) => prev + 1);
        setIsInputWrong(true);
        shake();
      }
    } else {
      setAttemptCount((prev) => prev + 1);
      setIsInputWrong(true);
      shake();
    }
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
        Verify Your Email
      </Text>
      <Text fontSize="$3" color="$secondary" mb="$5">
        We sent a code to your email.
      </Text>
      <Animated.View style={[rShakeStyle]}>
        <Stack gap="$2" width="80%">
          <OtpInput
            secureTextEntry
            numberOfDigits={6}
            onFilled={handleOtpFilled}
            theme={{
              pinCodeTextStyle: {
                color: "$primary",
              },
              pinCodeContainerStyle: {
                borderColor: isInputWrong ? "$red" : "$green",
              },
              focusedPinCodeContainerStyle: {
                borderColor: isInputWrong ? "$red" : "$green",
              },
            }}
          />
        </Stack>
      </Animated.View>
      <XStack mt="$3" ai="center">
        <Text fontSize="$2" color="$color">
          Didn't get a code?
        </Text>
        <Text
          fontWeight="bold"
          style={{ textDecorationLine: "underline" }}
          ml="$2"
          fontSize="$2"
        >
          Click to resend
        </Text>
      </XStack>
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
            Continue
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
