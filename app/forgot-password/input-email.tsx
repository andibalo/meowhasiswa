import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useRouter } from "expo-router";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from "hooks";
import { useSendResetPasswordCodeMutation } from "redux/api";
import { Pressable } from "react-native";

type InputEmailFormData = {
  email: string
}

const inputEmailSchema = yup.object().shape({
  email: yup.
    string().
    required('Email is required').
    email("Invalid email format"),
});

export default function ForgotPasswordInputEmailScreen() {
  const router = useRouter();
  const toast = useToast()

  const [sendResetPasswordCode] = useSendResetPasswordCodeMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputEmailFormData>({
    resolver: yupResolver(inputEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleInputEmail = async (formData: InputEmailFormData) => {
    try {

      await sendResetPasswordCode({ email: formData.email })

      router.push({
        pathname: "/forgot-password/verify-code",
        params: { email: formData.email },
      });
    } catch (error) {
      toast.showToastError("Could not send reset password code", error)
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$background">
      <YStack mb="$1" ai="center">
        <Image
          source={require("../../assets/images/meow-logo.png")}
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              bg="$backgroundSoft"
              padding="$3"
              borderRadius="$2"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text color="$red10" fontSize={12}>
            {errors.email.message}
          </Text>
        )}
      </Stack>
      <XStack width="80%" jc="center" mt="$5">
        <Button
          onPress={handleSubmit(handleInputEmail)}
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
        <Pressable
          onPress={() => {
            // @ts-ignore
            router.push("/login");
          }}>
          <Text
            fontWeight="bold"
            style={{ textDecorationLine: "underline" }}
            ml="$2"
          >
            Login
          </Text>
        </Pressable>
      </XStack>
    </YStack>
  );
}
