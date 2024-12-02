import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useState, useCallback } from "react";
import { useVerifyEmailMutation } from "redux/api";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function VerifyEmailScreen() {
  const router = useRouter();
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
    if (otpText === String(verifyEmail)) {
        setIsInputWrong(true)
        shake()
        return
    }
    router.push("/login")
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
    </YStack>
  );
}
