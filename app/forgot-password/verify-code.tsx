import { Stack, Text, YStack, XStack, Image } from "tamagui";
import { OtpInput } from "react-native-otp-entry";
import { Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "hooks";
import { useVerifyResetPasswordCodeMutation } from "redux/api";

export default function ForgotPasswordOtpScreen() {

    const router = useRouter()
    const { email } = useLocalSearchParams<{ email: string }>();
    const [verifyResetPassword] = useVerifyResetPasswordCodeMutation()

    const toast = useToast()

    const handleOtpFilled = async (code: string) => {
        try {
            await verifyResetPassword({
                email,
                code
            })

            router.push({
                pathname: "/forgot-password/new-password",
                params: { email },
            });
        } catch (error) {
            toast.showToastError("Invalid code. Please try again.");
        }
    };

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
                Password Reset
            </Text>
            <Text fontSize="$3" color="$secondary" mb="$5">
                We've sent a code to your email.
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
            <XStack mt="$3" ai="center">
                <Text fontSize="$3" color="$color">
                    Didn't receive a code?
                </Text>
                <Pressable onPress={() => null}>
                    <Text
                        fontWeight="bold"

                        style={{ textDecorationLine: "underline" }}
                        ml="$2"
                    >
                        Resend Code
                    </Text>
                </Pressable>
            </XStack>
        </YStack>
    );
}
